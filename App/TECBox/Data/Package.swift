//
//  Package.swift
//  TECBox
//
//  Created by Alejandro Ibarra on 3/7/20.
//  Copyright © 2020 Schlafenhase. All rights reserved.
//

import Foundation

struct Package: Codable {
    var trackingID: String
    var client: String
    var description: String
    var deliveryDate: String
    var status: String
    var route: String
    var deliveryMan: String
}

struct PackagedPackage: Identifiable {
    var id = UUID()
    var item: Package
}
