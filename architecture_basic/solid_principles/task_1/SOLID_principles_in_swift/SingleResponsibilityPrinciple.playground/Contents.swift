// Good: 単一責任の原則でクラスを分割する
class ConversationInteractor {
  let userId: String
  let apiService: ConversationAPIService
  let dbHandler: ConversationDBOperation
  init(userId: String,
       apiService: ConversationAPIService,
       dbHandler: ConversationDBOperation) {
    self.userId = userId
    self.apiService = apiService
    self.dbHandler = dbHandler
  }

  func fetchAllConversations() {
    let conversations = apiService.fetchRemoteConversation(for: userId)
    dbHandler.save(conversations: conversations, for: userId)
  }
}

protocol ConversationAPIService {
  func fetchRemoteConversation(for userId: String) -> [Conversation]
}

// メッセージのJSONデータを取得するためにAPIリクエストを行い、データをパースして、メッセージオブジェクトの配列を作成する
class RemoteService: ConversationAPIService {
  func fetchRemoteConversation(for userId: String) -> [Conversation] {
    return []
  }
}

protocol ConversationDBOperation {
  func save(conversations: [Conversation], for userId: String) -> Bool
}

// オブジェクトをデータベースに保存する
class ConversationRepository: ConversationDBOperation {
  func save(conversations: [Conversation], for userId: String) -> Bool {
    // データベースに[Conversation]を保存する処理を取り扱う
    return true
  }
}

class Conversation: Codable {
    // モデルの定義
}
