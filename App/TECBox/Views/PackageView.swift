//
//  PackageView.swift
//  TECBox
//
//  Created by Alejandro Ibarra on 3/7/20.
//  Copyright © 2020 Schlafenhase. All rights reserved.
//

import SwiftUI
import Alamofire

struct PackageView: View {
    @State var packages = [PackagedPackage]()
    @EnvironmentObject var userSession: AppSession
    
    // Initialize custom Alamofire session without server evaluators for testing
    private let session: Session = {
        let manager = ServerTrustManager(evaluators: ["192.168.0.15": DisabledEvaluator()])
        let configuration = URLSessionConfiguration.af.default

        return Session(configuration: configuration, serverTrustManager: manager)
    }()
    
    init() {
        UITableView.appearance().backgroundColor = UIColor(named: "Background")
        UITableViewCell.appearance().backgroundColor = UIColor(named: "Background")
        UITableView.appearance().tableFooterView = UIView()
    }
    
    var body: some View {
        RefreshableNavigationView(title: "Packages - \(userSession.session!.name)", action:{
            self.updatePackages()
        }){
            ForEach(self.packages) { packagedPackage in
                PackageRow(package: packagedPackage.item)
            }
        }.onAppear() {
            self.updatePackages()
        }
    }
    
    /// Updates packages in list view
    func updatePackages() {
        // Request new data depending on logged delivery man
        self.session.request("https://192.168.0.15:5001/warehouse/packages/employeePackages", method: .post, parameters: userSession.session, encoder: JSONParameterEncoder.prettyPrinted)
            .validate()
            .responseDecodable(of: [Package].self) { (response) in
                guard let data = response.value else { return }
                self.packages = self.wrapPackages(packageList: data)
            }
    }
    
    /// Wraps incoming package list from server with unique identifier for SwiftUI
    func wrapPackages(packageList: [Package]) -> [PackagedPackage] {
        var result = [PackagedPackage]()
        for package in packageList {
            result.append(PackagedPackage(item: package))
        }
        
        return result
    }
    
}

struct PackageView_Previews: PreviewProvider {
    static var previews: some View {
        PackageView()
    }
}


