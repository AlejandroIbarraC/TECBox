//
//  PackageDetail.swift
//  TECBox
//
//  Created by Alejandro Ibarra on 3/7/20.
//  Copyright © 2020 Schlafenhase. All rights reserved.
//

import SwiftUI

struct PackageDetail: View {
    var package: Package
    var statusList = ["Delivered", "Failed to deliver", "Returned"]
    
    @State private var selectedStatus = 0
    
    func setPackageStatus() {
        print(selectedStatus)
    }
    
    var body: some View {
        ZStack {
            Color("Background").edgesIgnoringSafeArea(.all)
            
            VStack {
                Text(package.description)
                    .padding(25.0)
                    .background(Color("Background"))
                
                Section {
                    Picker(selection: $selectedStatus, label: Text("Package Status")) {
                        ForEach(0 ..< statusList.count) {
                            Text(self.statusList[$0])
                        }
                    }
                    .padding(.top, 80.0)
                        .pickerStyle(SegmentedPickerStyle())
                }
                
                Button(action: setPackageStatus) {
                    NeomorphicButtonContent(text: "Set Package Status")
                        .padding(.top, 50.0)
                }
            }
        }
        .navigationBarTitle(Text(package.name), displayMode: .inline)
    }
}

struct PackageDetail_Previews: PreviewProvider {
    static var previews: some View {
        PackageDetail(package: Package.example)
    }
}
