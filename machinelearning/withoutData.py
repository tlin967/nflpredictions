import pandas as pd
import numpy as np
from sklearn import tree
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn import svm
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.naive_bayes import GaussianNB
from sklearn.naive_bayes import ComplementNB
from sklearn.naive_bayes import BernoulliNB
from sklearn.naive_bayes import MultinomialNB

from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split


def runClassifiers(X_train, y_train, X_test, y_test):
    #create logistic model
    logreg = LogisticRegression(random_state=0, solver='lbfgs', max_iter=10000, class_weight='balanced')
    logreg.fit(X_train, y_train)

    #Predict with logistic regression
    log_pred = logreg.predict(X_test)

    #create SVM classifier
    clf = svm.SVC(gamma=0.001, C=100.)
    clf.fit(X_train, y_train)

    #predict with svm
    svm_predict = clf.predict(X_test)

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

    #create linear discriminant analysis
    lin_clf = LinearDiscriminantAnalysis()
    lin_clf.fit(X_train, y_train)

    #predict with linn dis
    lin_predict = lin_clf.predict(X_test)

    #create naive bayes analysis
    naive_clf = GaussianNB()
    naive_predict = naive_clf.fit(X_train, y_train).predict(X_test)

    #create random forest
    rand_clf = RandomForestClassifier(max_depth=5, n_estimators=10, max_features=1)
    rand_predict = rand_clf.fit(X_train, y_train).predict(X_test)

    #neural net
    neural_clf = MLPClassifier(alpha=1)
    neural_predict = neural_clf.fit(X_train, y_train).predict(X_test)

    #adaboost
    ada_clf = AdaBoostClassifier()
    ada_predict = ada_clf.fit(X_train, y_train).predict(X_test)


    #print results of log reg
    print('\nAccuracy of LR classifier on test set: {:.3f}'.format(np.mean(log_pred == y_test)))

    #print results of svm
    print ('Accuracy of SVM classifier on test set: {:.3f}'.format(accuracy_score(y_test, svm_predict)))

    #print results of knn
    print ('Accuracy of KNN classifier on test set: {:.3f}'.format(accuracy_score(y_test, knn_predict)))

    #print results of dtree
    print ('Accuracy of DTREE classifier on test set: {:.3f}'.format(accuracy_score(y_test, dtree_predict)))

    #print results of lin dis
    print ('Accuracy of Linear Discriminant classifier on test set: {:.3f}'.format(accuracy_score(y_test, lin_predict)))

    #print results of naive
    print ('Accuracy of Naive classifier on test set: {:.3f}'.format(accuracy_score(y_test, naive_predict)))

    #print results of rand
    print ('Accuracy of Random Forest classifier on test set: {:.3f}'.format(accuracy_score(y_test, rand_predict)))

    #print results of neural
    print ('Accuracy of Neural Net classifier on test set: {:.3f}'.format(accuracy_score(y_test, neural_predict)))

    #print results of ada
    print ('Accuracy of ADA Boost classifier on test set: {:.3f}'.format(accuracy_score(y_test, ada_predict)))

    return naive_predict
#import and convert train data from csv into dataframe
data = pd.read_csv("alldata.csv")


#drop columns
cols_to_drop = ['schedule_date', 'schedule_season', 'schedule_week', 'stadium', 'score_home', 'score_away']
data = data.drop(cols_to_drop, axis=1)

#change schedule_playoff to 0 and 1
data.loc[data.schedule_playoff == False, 'schedule_playoff'] = 0
data.loc[data.schedule_playoff == True, 'schedule_playoff'] = 1

#change full_result to 0 and 1
data.loc[data.full_result == 'A', 'full_result'] = 0
data.loc[data.full_result == 'H', 'full_result'] = 1

#change stadium_neutral to 0 and 1
data.loc[data.stadium_neutral == False, 'stadium_neutral'] = 0
data.loc[data.stadium_neutral == True, 'stadium_neutral'] = 1

# #take absolute value of spread
# data['spread_favorite'] = data['spread_favorite'].abs()

# #only take complete cases
data.dropna(inplace=True)

#converts columns into factors
col_to_transform = ['team_home', 'team_away', 'team_favorite_id','weather_detail']
data = pd.get_dummies(data = data, columns=col_to_transform)

#reset the indexes
data.reset_index(inplace=True)
data.drop('index', axis=1, inplace=True)

#split into x and y data for entire dataset
data_y = data.loc[: ,['full_result']]
data_x = data.drop(['full_result'], axis = 1)

#curretn dataset at this point
data.to_csv("nowData.csv")

#fork a new dataframe to contain the names
dataWithNames = data[:]

#Scaling and using PCA on data_x dataset only, save data_y for later
scaler = StandardScaler()
scale_train_data = scaler.fit_transform(data_x)

pca = PCA().fit(scale_train_data)

plt.figure()
plt.plot(np.cumsum(pca.explained_variance_ratio_))
plt.xlabel('Number of Components')
plt.ylabel('Variance (%)') #for each component
plt.title('NFL Games Dataset')
# plt.show()

pca = PCA(n_components=93)
new_train_data = pca.fit_transform(scale_train_data)

#resave the normalized dataset into the data_x variable
data_x = pd.DataFrame(new_train_data)

#recollaborate the data
data_x.reset_index(inplace=True)
data_y.reset_index(inplace=True)
data_x.drop('index',axis=1,inplace=True)
data_y.drop('index', axis=1, inplace=True)

data = pd.concat([data_x, data_y], axis = 1)

#dataset at this point
data.to_csv('afterPCAData.csv')
print data

#rest of data that is not 2018 will be train data
train_data = data.iloc[:2100]

#indexes that are 2018+ is 2100 to 2366, collect as testdata
test_data = data.iloc[2100:]

#Down sample the training data only
count_class0, count_class1 = train_data.full_result.value_counts()
# #divide training data by class 0 or 1
train_away = train_data[train_data['full_result'] == 0]
train_home = train_data[train_data['full_result'] == 1]
# Down Sample
train_undersample = train_home.sample(count_class1)
train_data = pd.concat([train_undersample, train_away], axis=0)

print("# of H and A values in train data after down sampling")
print(train_data.full_result.value_counts())

#create X and y sets of training data by splitting the training data
X_train = train_data.drop(['full_result'], axis=1)
y_train = train_data['full_result']

print ("# of H and A values in test data: ")
print(test_data.full_result.value_counts())

#create X and y sets of test data
X_test = test_data.drop(['full_result'], axis=1)
y_test = test_data['full_result']

naiveClassification = runClassifiers(X_train, y_train, X_test, y_test)
print naiveClassification
