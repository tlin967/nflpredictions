# #create SVM plot
# #take first two features
# X = X_train[['weather_wind_mph', 'spread_favorite']].values
# print X
# y = y_train.copy().values
# print y
# svc_plot = svm.SVC(gamma='scale', probability=True, kernel='linear').fit(X, y)
#
# h = .02
# x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
# y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
# xx, yy = np.meshgrid(np.arange(x_min, x_max, h),
#                      np.arange(y_min, y_max, h))
# title = "SVC with Linear Kernel"
#
# # Plot the decision boundary. For that, we will assign a color to each
# # point in the mesh [x_min, m_max]x[y_min, y_max].
# plt.subplot(2, 2, 1)
# plt.subplots_adjust(wspace=0.4, hspace=0.4)
#
# Z = svc_plot.predict(np.c_[xx.ravel(), yy.ravel()])
#
# # Put the result into a color plot
# Z = Z.reshape(xx.shape)
# plt.contourf(xx, yy, Z, cmap=plt.cm.Paired, alpha=0.8)
#
# # Plot also the training points
# plt.scatter(X[:, 0], X[:, 1], c=y, cmap=plt.cm.Paired)
# plt.xlabel('Weather MPH')
# plt.ylabel('Spread Favorite')
# plt.xlim(xx.min(), xx.max())
# plt.ylim(yy.min(), yy.max())
# plt.xticks(())
# plt.yticks(())
# plt.title(title)
# plt.show()
