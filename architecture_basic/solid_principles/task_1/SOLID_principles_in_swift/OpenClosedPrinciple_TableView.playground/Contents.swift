import UIKit

protocol SectionHandler {
  var type: String { get }
  func tableView(_ cellModel: CellModel,
                 _ tableView: UITableView,
                 cellForRowAt indexPath: IndexPath) -> UITableViewCell
}

class SectionContainer {
    var sectionHandlers: [String: SectionHandler] = [:]
    init(handlers: [SectionHandler]) {
        handlers.forEach{ handler in
            sectionHandlers[handler.type] = handler
        }
    }
    
    func tableView(_ cellModel: CellModel,
                   _ tableView: UITableView,
                   cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let sectionHandler = sectionHandlers[cellModel.type.rawvalue] else {
            return UITableViewCell()
        }
    }
}

enum CellModel: String {
    // モデルの定義
    case type = "sometype"
}

enum ListDataType: String {
    // リストの種類
    case product = "product"
    case ad = "ad"
}

class ProductSectionHandler: SectionHandler {
    var type: String {
        return ListDataType.product.rawValue
    }
    
    func tableView(_ cellModel: CellModel,
                   _ tableView: UITableView,
                   cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let productCell = tableView.dequeueReusableCell(withIdentifier: ProductCell.reuseId) as? ProductCell else {
            return UITableViewCell()
        }
        
        productCell.cellModel = cellModel
        return productCell
    }
}

class AdSectionHandler: SectionHandler {
    var type: String {
        return ListDataType.ad.rawValue
    }
    
    func tableView(_ cellModel: CellModel,
                   _ tableView: UITableView,
                   cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let adCell = tableView.dequeueReusableCell(withIdentifier: AdCell.reuseId) as? AdCell else {
            return UITableViewCell()
        }
        
        adCell.cellModel = cellModel
        return adCell
    }
}

class ListViewController: UITableViewController {
    let data: [CellModel] = []
    
    let sectionContainer: SectionContainer
    init(sectionContainer: SectionContainer) {
        self.sectionContainer = sectionContainer
        super.init(style: .plain)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func tableView(_ tableView: UITableView,
                             cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellModel = data[indexPath.row]
        return sectionContainer.tableView(cellModel, tableView, cellForRowAt: indexPath)
    }
}

let supportedSections = SectionContainer(handlers: [ProductSectionHandler(),
                                                    AdSectionHandler()])

let listViewController = ListViewController(sectionContainer: supportedSections)
