//
//  SettingsView.swift
//  TECBox
//
//  Created by Alejandro Ibarra on 3/7/20.
//  Copyright © 2020 Schlafenhase. All rights reserved.
//

import SwiftUI

struct SettingsView: View {
    @EnvironmentObject var session: Session
    
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
        Button(action: logOut) {
            LogOutButtonContent()
        }
    }
}

struct SettingsView_Previews: PreviewProvider {
    static var previews: some View {
        SettingsView().environmentObject(Session())
    }
}

struct LogOutButtonContent: View {
    var body: some View {
        Text("Log Out")
            .font(/*@START_MENU_TOKEN@*/.headline/*@END_MENU_TOKEN@*/)
            .foregroundColor(Color("TextColor"))
            .padding()
            .frame(width: /*@START_MENU_TOKEN@*/220.0/*@END_MENU_TOKEN@*/, height: /*@START_MENU_TOKEN@*/60.0/*@END_MENU_TOKEN@*/)
            .background(Color("Background"))
            .cornerRadius(/*@START_MENU_TOKEN@*/20.0/*@END_MENU_TOKEN@*/)
            .shadow(color: Color("LightShadow"), radius: 8, x: -8, y: -8)
            .shadow(color: Color("DarkShadow"), radius: 8, x: 8, y: 8)
    }
}
