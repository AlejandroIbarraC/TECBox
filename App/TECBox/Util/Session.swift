//
//  ViewRouter.swift
//  TECBox
//
//  Created by Alejandro Ibarra on 3/6/20.
//  Copyright © 2020 Schlafenhase. All rights reserved.
//

import Foundation
import Combine
import SwiftUI
import Firebase

class Session: ObservableObject {
    let objectWillChange = PassthroughSubject<Session,Never>()
    var session: User? { didSet { self.objectWillChange.send(self) }}
    var handle: AuthStateDidChangeListenerHandle?
    var currentPage: String = "menu" {
        didSet {
            withAnimation() {
                objectWillChange.send(self)
            }
        }
    }
    
    func listen () {
        // Monitor authentication changes using Firebase
        handle = Auth.auth().addStateDidChangeListener { (auth, user) in
            if let user = user {
                // If we have a user, create a new user model
                print("Got user: \(user)")
                self.session = User(
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email
                )
            } else {
                // If we don't have a user, set our session to nil
                self.session = nil
            }
        }
    }

    func signUp(
        email: String,
        password: String,
        handler: @escaping AuthDataResultCallback
        ) {
        Auth.auth().createUser(withEmail: email, password: password, completion: handler)
    }

    func signIn(
        email: String,
        password: String,
        handler: @escaping AuthDataResultCallback
        ) {
        Auth.auth().signIn(withEmail: email, password: password, completion: handler)
    }

    func signOut () -> Bool {
        do {
            try Auth.auth().signOut()
            self.session = nil
            return true
        } catch {
            return false
        }
    }
    
    func unbind () {
        if let handle = handle {
            Auth.auth().removeStateDidChangeListener(handle)
        }
    }
    
}
