//
//  SettingsView.swift
//  TECBox
//
//  Created by Alejandro Ibarra on 3/7/20.
//  Copyright © 2020 Schlafenhase. All rights reserved.
//

import SwiftUI

struct SettingsView: View {
    @EnvironmentObject var session: AppSession
    
    /// Logs out with Firebase authentication
    func logOut() {
        let hasSignedOut = session.signOut()
        if hasSignedOut {
            print("Success signing out")
        } else {
            print("Error signing out")
        }
    }
    
    var body: some View {
        ZStack {
            Color("Background").edgesIgnoringSafeArea(.all)
            VStack {
                AppLogo()
                WelcomeText()
                    .frame(width: 150.0)
                WelcomeSubText()
                    .foregroundColor(Color("Terciary"))
                
                Text("Login information:")
                    .padding(.bottom, 25.0)
                Text("Name: \(session.session!.name)")
                Text("Email: \(session.session!.eMail)")
                Text("Employee ID: \(session.session!.id)")
                
                Text("Schlafenhase. 2020\nMade in Costa Rica")
                    .font(.footnote)
                    .padding(EdgeInsets(top: 70, leading: 0, bottom: 70, trailing: 0))
                
                Button(action: logOut) {
                    NeomorphicButtonContent(text: "Log Out")
                }
            }
        }
    }
}

struct SettingsView_Previews: PreviewProvider {
    static var previews: some View {
        SettingsView().environmentObject(AppSession())
    }
}
