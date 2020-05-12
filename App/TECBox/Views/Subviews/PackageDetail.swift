//
//  PackageDetail.swift
//  TECBox
//
//  Created by Alejandro Ibarra on 3/7/20.
//  Copyright © 2020 Schlafenhase. All rights reserved.
//

import SwiftUI
import Alamofire

struct PackageDetail: View {
    var statusList = ["Delivered", "Failed to Deliver", "Returned"]
    
    @State var package: Package
    @State private var selectedStatus = 0
    
    // Initialize custom Alamofire session without server evaluators for testing
    private let session: Session = {
        let manager = ServerTrustManager(evaluators: ["192.168.0.15": DisabledEvaluator()])
        let configuration = URLSessionConfiguration.af.default

        return Session(configuration: configuration, serverTrustManager: manager)
    }()
    
    /// Connect to server and post new package status
    func setPackageStatus() {
        // Modify package
        switch selectedStatus {
        case 0:
            package.status = "Delivered"
        case 1:
            package.status = "Failed to Deliver"
        case 2:
            package.status = "Returned"
        default:
            print("Error setting package status")
        }
        
        // Connect to server and update package
        let nPackage = package
        self.session.request("https://192.168.0.15:5001/warehouse/packages/modify", method: .post, parameters: nPackage, encoder: JSONParameterEncoder.prettyPrinted)
        .validate()
        .responseJSON() { (response) in
        }
    }
    
    var body: some View {
        ZStack {
            Color("Background").edgesIgnoringSafeArea(.all)
            
            VStack {
                Text("Package ID: \(package.trackingID)")
                    .padding(25.0)
                    .background(Color("Background"))
                    .font(.headline)
                Text("Client: \(package.client)")
                Text("Description: \(package.description)")
                Text("Delivery Date: \(package.deliveryDate)")
                Text("Route: \(package.route)")
                Text("DeliveryMan: \(package.deliveryMan)")
                Text("Status: \(package.status)")
                    .foregroundColor(Color("Terciary"))
                    .padding(25.0)
                
                Section {
                    Picker(selection: $selectedStatus, label: Text("Package Status")) {
                        ForEach(0 ..< statusList.count) {
                            Text(self.statusList[$0])
                        }
                    }
                    .padding(.top, 80.0)
                    .padding(.horizontal, 30.0)
                        .pickerStyle(SegmentedPickerStyle())
                }
                
                Button(action: setPackageStatus) {
                    NeomorphicButtonContent(text: "Set Package Status")
                        .padding(.top, 50.0)
                }
            }
        }
        .navigationBarTitle(Text("\(package.description) \(package.trackingID)"), displayMode: .inline)
    }
}

struct PackageDetail_Previews: PreviewProvider {
    static var previews: some View {
        Text("Test")
        
    }
}
