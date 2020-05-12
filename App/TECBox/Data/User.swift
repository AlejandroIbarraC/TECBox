//
//  User.swift
//  TECBox
//
//  Created by Alejandro Ibarra on 3/7/20.
//  Copyright © 2020 Schlafenhase. All rights reserved.
//

import Foundation

struct User: Codable {
    var name: String
    var department: String
    var eMail: String
    var password: String
    var id: String
}
