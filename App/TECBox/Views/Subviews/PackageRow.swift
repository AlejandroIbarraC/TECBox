//
//  PackageRow.swift
//  TECBox
//
//  Created by Alejandro Ibarra on 3/7/20.
//  Copyright © 2020 Schlafenhase. All rights reserved.
//

import SwiftUI

struct PackageRow: View {
    var package: Package
    
    var body: some View {
        NavigationLink(destination: PackageDetail(package: package)) {
            HStack {
                VStack(alignment: .leading) {
                    Text(package.name)
                        .font(.headline)
                    Text("ID: \(package.price)")
                }
            }
        }
    }
}

struct PackageRow_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            PackageRow(package: Package.example)
        }
    }
}
