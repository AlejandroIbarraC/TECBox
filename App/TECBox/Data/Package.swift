//
//  Package.swift
//  TECBox
//
//  Created by Alejandro Ibarra on 3/7/20.
//  Copyright © 2020 Schlafenhase. All rights reserved.
//

import Foundation

struct Package: Codable, Equatable, Identifiable {
    var id: UUID
    var name: String
    var photoCredit: String
    var price: Int
    var restrictions: [String]
    var description: String

    var mainImage: String {
        name.replacingOccurrences(of: " ", with: "-").lowercased()
    }

    var thumbnailImage: String {
        "\(mainImage)-thumb"
    }

    #if DEBUG
    static let example = Package(id: UUID(), name: "Maple French Toast", photoCredit: "Joseph Gonzalez", price: 6, restrictions: ["G", "V"], description: "Sweet, fluffy, and served piping hot, our French toast is flown in fresh every day from Maple City, Canada, which is where all maple syrup in the world comes from. And if you believe that, we have some land to sell you…")
    #endif
}

struct PackageSection: Codable, Identifiable {
    var id: UUID
    var name: String
    var items: [Package]
}
