import pandas as pd
import numpy as np
from sklearn import tree
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn import svm
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score
from sklearn.decomposition import PCA
from sklearn.feature_selection import RFE
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn import datasets
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis as LDA


#import and convert train data from csv into dataframe
data = pd.read_csv("alldata.csv")
teams = pd.read_csv("nfl_teams.csv")

print "------Initial Dataset------"
print data.head(10)
print "\n"

# map team_id to the correct teams
data['team_home'] = data.team_home.map(teams.set_index('team_name')['team_id'].to_dict())
data['team_away'] = data.team_away.map(teams.set_index('team_name')['team_id'].to_dict())

# creating home favorite and away favorite columns (fill na with 0's)
data.loc[data.team_favorite_id == data.team_home, 'home_favorite'] = 1
data.loc[data.team_favorite_id == data.team_away, 'away_favorite'] = 1
data.home_favorite.fillna(0, inplace=True)
data.away_favorite.fillna(0, inplace=True)

#change stadium_neutral to 0 and 1
data.loc[data.stadium_neutral == False, 'stadium_neutral'] = 0
data.loc[data.stadium_neutral == True, 'stadium_neutral'] = 1

#change full_result to 0 and 1
data.loc[data.full_result == 'A', 'full_result'] = 0
data.loc[data.full_result == 'H', 'full_result'] = 1

#change schedule_playoff to 0 and 1
data.loc[data.schedule_playoff == False, 'schedule_playoff'] = 0
data.loc[data.schedule_playoff == True, 'schedule_playoff'] = 1

#change words in schedule week to numbers
data.loc[data.schedule_week == 'Wildcard', 'schedule_week'] = 18
data.loc[data.schedule_week == 'Division', 'schedule_week'] = 19
data.loc[data.schedule_week == 'Conference', 'schedule_week'] = 20
data.loc[data.schedule_week == 'Superbowl', 'schedule_week'] = 21

#take absolute value of spread
data['spread_favorite'] = data['spread_favorite'].abs()

print "------After Data Cleaning------"
print data.head(10)
print "\n"

#calculate percentages to consider
home_win = "{:.2f}".format((sum((data.full_result == 1) & (data.stadium_neutral == 0)) / float(len(data))) * 100)
away_win = "{:.2f}".format((sum((data.full_result == 0) & (data.stadium_neutral == 0)) / float(len(data))) * 100)
favored = "{:.2f}".format((sum(((data.home_favorite == 1) & (data.full_result == 1)) | ((data.away_favorite == 1) & (data.full_result == 0)))
                           / float(len(data))) * 100)

# print all percentages
print("------Calculate Percentages From Data------")
print("Number of Games: " + str(len(data)))
print("Home Wins Percentage: " + home_win + "%")
print("Away Wins Percentage: " + away_win + "%")
print("Spread Favorite Win Percentage: " + favored + "%")
print "\n"

#drop uneccessary columns
cols_to_drop = ['stadium', 'score_home', 'score_away', 'schedule_date', 'team_home', 'team_away', 'team_favorite_id']
data = data.drop(cols_to_drop, axis=1)

print("------After Dropping Unnecessary Columns------")
print data.head(10)
print "\n"


print "------View Number of Columns with NULL Values------"
print data.isnull().sum(axis=0)
print "\n"

#calculate means of weather temperature and weather wind mph columns for filling
print "------Calculate Means of Columns And Fill Columns------"
weatherTempMean = data[['weather_temperature']].mean(axis=0)
print weatherTempMean
weatherWindMphMean = data[['weather_wind_mph']].mean(axis=0)
print weatherWindMphMean
print "\n"

# #fill na spaces with the means of the column
data[['weather_temperature']] = data[['weather_temperature']].fillna(value=weatherTempMean)
data[['weather_wind_mph']] = data[['weather_wind_mph']].fillna(value=weatherWindMphMean)

print "------View Number of Columns with NULL Values Again------"
print data.isnull().sum(axis=0)
print "\n"

# #save dataframe with names for later use
# dataWithNames = data.copy()
#
# #drop schedule date after saving it in dataWithNames
# cols_to_drop = ['schedule_date', 'team_home', 'team_away', 'team_favorite_id']
# data = data.drop(cols_to_drop, axis=1)

#converts columns into factors
col_to_transform = ['weather_detail']
data = pd.get_dummies(data = data, columns=col_to_transform)

print "------Convert Categorical Variable Into Dummy Variables------"
print data.head(10)
print "\n"

#split data into train and test data, copy data
train_data = data.copy()
test_data = data.copy()

train_data = train_data.loc[train_data['schedule_season'] < 2018]
test_data = test_data.loc[test_data['schedule_season'] > 2017]
# dataWithNames = dataWithNames.loc[dataWithNames['schedule_season'] > 2017]

print "------Last 10 Rows in Train Data------"
print train_data.tail(10)
print "\n"

print "------First 10 Rows in Test Data------"
print test_data.head(10)
print "\n"

train_data.to_csv("currentTrainingDataset.csv")
test_data.to_csv("currentTestDataset.csv")
# dataWithNames.to_csv("dataWithNames.csv")

print "------Number of H and A Values in Train Data------"
print train_data.full_result.value_counts()
print "\n"

# Down Sample
count_class0, count_class1 = train_data.full_result.value_counts()
# #divide training data by class 0 or 1
train_away = train_data[train_data['full_result'] == 0]
train_home = train_data[train_data['full_result'] == 1]
train_undersample = train_home.sample(count_class1)
down_train = pd.concat([train_undersample, train_away], axis=0)

print("------Number of H and A Values in Train Data After Undersampling------")
print down_train.full_result.value_counts()
print "\n"

#create X and y sets of training data
X_train = down_train.drop(['full_result'], axis=1)
y_train = down_train['full_result']

print ("------Number of H and A Values In Test Data------")
print(test_data.full_result.value_counts())
print "\n"

#create X and y sets of test data
X_test = test_data.drop(['full_result'], axis=1)
y_test = test_data['full_result']

print ("------First 10 rows of Randomized Training Data------")
print X_train.head(10)
print "\n"

print ("------First 10 rows of Test Data------")
print X_test.head(10)
print "\n"

#Scaling
scaler = StandardScaler()

scale_train_data = scaler.fit_transform(X_train.astype(float))
scaled_train_data = pd.DataFrame(scale_train_data, columns=X_train.columns)

scale_test_data = scaler.fit_transform(X_test.astype(float))
scaled_test_data = pd.DataFrame(scale_test_data, columns=X_test.columns)

print ("------First 10 rows of Train Data After Normalizing------")
print scaled_train_data.head(10)
print "\n"

#Perform PCA
pca = PCA().fit(scale_train_data)
plt.figure()
plt.plot(np.cumsum(pca.explained_variance_ratio_))
plt.xlabel('Number of Components')
plt.ylabel('Variance (%)') #for each component
plt.title('NFL Games Dataset')
plt.show()


# initialize base model
base = LogisticRegression(solver='lbfgs', max_iter=10000)
# choose best 10 features
rfe = RFE(base, 10)
rfe = rfe.fit(X_train, y_train)

# features approvals
columnApprovals = rfe.support_
# print(rfe.ranking_)

print "------Best 10 Features Chosen by RFE------"
for i, colName in enumerate(X_train):
    print ("%s: %s" % (colName, columnApprovals[i]))
print "\n"

#remake the training sets with the best 10 columns
X_train = X_train[[
    'schedule_playoff',
    'spread_favorite',
    'stadium_neutral',
    'weather_wind_mph',
    'home_favorite',
    'away_favorite',
    'weather_detail_Dome',
    'weather_detail_Rain',
    'weather_detail_Snow',
    'weather_detail_Sunny']]

X_test = X_test[[
    'schedule_playoff',
    'spread_favorite',
    'stadium_neutral',
    'weather_wind_mph',
    'home_favorite',
    'away_favorite',
    'weather_detail_Dome',
    'weather_detail_Rain',
    'weather_detail_Snow',
    'weather_detail_Sunny']]

print ("------Training Data With Best 10 Columns------")
print X_train.head(10)
print "\n"

#create logistic model
logreg = LogisticRegression(random_state=0, solver='lbfgs', max_iter=10000, class_weight='balanced')
logreg.fit(X_train, y_train)

#Predict with logistic regression
log_pred = logreg.predict(X_test)

#create SVM classifier
svc = svm.SVC(gamma='scale', probability=True, kernel='linear')
svc.fit(X_train, y_train)

#predict with svm
svm_predict = svc.predict(X_test)

#create KNN classifier
neigh = KNeighborsClassifier(n_neighbors=3)
neigh.fit(X_train, y_train)

#predict with knn
knn_predict = neigh.predict(X_test)

#create Decision Tree classifier
dtree_clf =  tree.DecisionTreeClassifier()
dtree_clf = dtree_clf.fit(X_train, y_train)

#predict with dtree
dtree_predict = dtree_clf.predict(X_test)

#create naive bayes analysis
naive_clf = GaussianNB()
naive_predict = naive_clf.fit(X_train, y_train).predict(X_test)

#neural net
neural_clf = MLPClassifier(alpha=1)
neural_predict = neural_clf.fit(X_train, y_train).predict(X_test)

print("------Accuracies of Multiple Classifiers------")
#print results of log reg
print('Accuracy of LR classifier on test set: {:.3f}'.format(accuracy_score(y_test, log_pred)))

#print results of svm
print ('Accuracy of SVM classifier on test set: {:.3f}'.format(accuracy_score(y_test, svm_predict)))

#print results of knn
print ('Accuracy of K-NN classifier on test set: {:.3f}'.format(accuracy_score(y_test, knn_predict)))

#print results of dtree
print ('Accuracy of Decision Tree classifier on test set: {:.3f}'.format(accuracy_score(y_test, dtree_predict)))

#print results of naive
print ('Accuracy of Naive classifier on test set: {:.3f}'.format(accuracy_score(y_test, naive_predict)))

#print results of neural
print ('Accuracy of Neural Net classifier on test set: {:.3f}'.format(accuracy_score(y_test, neural_predict)))
print "\n"

#print columns with their respective weights in logistic regressions
print "------Columns and Their Weights For Logistic Regression------"
i = 0
for col in X_train:
    print ("%s : %s" % (col, logreg.coef_[0][i]))
    i = i + 1
print "\n"

#print columns with their respective weights in svm
print "------Columns and Their Weights For SVM------"
i = 0
for col in X_train:
    print ("%s : %s" % (col, svc.coef_[0][i]))
    i = i + 1
print "\n"

#Plot ROC curve
import sklearn.metrics as metrics
# calculate the fpr and tpr for all thresholds of the classification
probs = svc.predict_proba(X_test)
preds = probs[:,1]
fpr, tpr, threshold = metrics.roc_curve(y_test, preds)
roc_auc = metrics.auc(fpr, tpr)

import matplotlib.pyplot as plt
plt.title('ROC Graph With SVM')
plt.plot(fpr, tpr, 'b', label = 'AUC = %0.2f' % roc_auc)
plt.legend(loc = 'lower right')
plt.plot([0, 1], [0, 1],'r--')
plt.xlim([0, 1])
plt.ylim([0, 1])
plt.ylabel('True Positive Rate')
plt.xlabel('False Positive Rate')
# plt.show()

#ROC with LOGREG
# calculate the fpr and tpr for all thresholds of the classification
probs = logreg.predict_proba(X_test)
preds = probs[:,1]
fpr, tpr, threshold = metrics.roc_curve(y_test, preds)
roc_auc = metrics.auc(fpr, tpr)

plt.title('ROC Graph With LR')
plt.plot(fpr, tpr, 'b', label = 'AUC = %0.2f' % roc_auc)
plt.legend(loc = 'lower right')
plt.plot([0, 1], [0, 1],'r--')
plt.xlim([0, 1])
plt.ylim([0, 1])
plt.ylabel('True Positive Rate')
plt.xlabel('False Positive Rate')
# plt.show()
