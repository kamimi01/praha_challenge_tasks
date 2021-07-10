protocol Database {
    func saveToDatabase(conversations: [Any])
}

class ConversationDataController {
  let database: CoreDataController

  init(inDatabase: Database) {
    database = inDatabase
  }

  func getAllConversations() {
    let conversations = [Any]()
    database.saveToDatabase(conversations: conversations)
  }
}

class CoreDataController: Database {
  func saveToDatabase(conversations: [Any]) {
    // メッセージを保存
  }
}

class FileSystemArchiving: Database {
    func saveToDatabase(conversations: [Any]) {
        // メッセージを保存
    }
}
