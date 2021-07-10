import Foundation

protocol UserProfileViewDetails {
    var profileImageURL: String { get }
}

class User: UserProfileViewDetails {
  var firstName: String
  var lastName: String
  var profileImageURL: String
  var bio: String
  var dateOfBirth: Date

  init(inFirstName: String,
       inLastName: String,
       inProfileImageURL: String,
       inBio: String,
       inDOB: Date) {
    firstName = inFirstName
    lastName = inLastName
    profileImageURL = inProfileImageURL
    bio = inBio
    dateOfBirth = inDOB
  }
}

class UserProfileImageView {
  func loadProfileFor(user: UserProfileViewDetails) {
    // URLからユーザーのプロファイル画像をロードして、表示する
  }
}
