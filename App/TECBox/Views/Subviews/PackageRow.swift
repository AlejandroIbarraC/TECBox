//
//  PackageRow.swift
//  TECBox
//
//  Created by Alejandro Ibarra on 3/7/20.
//  Copyright © 2020 Schlafenhase. All rights reserved.
//

import SwiftUI

struct PackageRow: View {
    @State var package: Package
    
    var body: some View {
        NavigationLink(destination: PackageDetail(package: package)) {
            HStack {
                VStack(alignment: .leading) {
                    Text(package.trackingID)
                        .font(.headline)
                    Text("Description: \(package.description)")
                    Text("Status: \(package.status)")
                    Text("Client: \(package.client)")
                }
            }
        }
    }
}

struct PackageRow_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            Text("Test")
        }
    }
}
