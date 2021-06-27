protocol TapGesture {
    func didTap()
}

protocol DoubleTapGesture {
    func didDoubleTap()
}

protocol LongTapGesture {
    func didLongTap()
}

class ProfileImageView: TapGesture, DoubleTapGesture, LongTapGesture {
  internal func didTap() {
    // didTapした時の挙動をかく
  }

  internal func didDoubleTap() {
    // didTapした時の挙動をかく
  }

  internal func didLongTap() {
    // didTapした時の挙動をかく
  }
}

class UserDetailView: TapGesture {
  internal func didTap() {
    // didTapした時の挙動をかく
  }
}
