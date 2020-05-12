//
//  LogInView.swift
//  TECBox
//
//  Created by Alejandro Ibarra on 3/5/20.
//  Copyright © 2020 Schlafenhase. All rights reserved.
//

import SwiftUI

struct LogInView: View {
    @State private var selection = 0
    @State var username: String = ""
    @State var password: String = ""
    @State var error = false
    
    @State var authenticationDidFail: Bool = false
    @State var authenticationDidSucceed: Bool = false
    
    @ObservedObject var keyBoardResponder = KeyboardResponder()
    @EnvironmentObject var session: AppSession
    
    /// Communicates log in form with session authentication server
    func logIn() {
        error = false
        session.signIn(email: username, password: password) { (result, error) in
            if error != nil {
                self.error = true
                self.authenticationDidFail = true
                self.authenticationDidSucceed = false
            } else {
                self.username = ""
                self.password = ""
                self.authenticationDidSucceed = true
            }
        }
        
    }
 
    var body: some View {
        ZStack {
            Color("Background").edgesIgnoringSafeArea(.all)
            
            VStack {
                AppLogo()
                WelcomeText()
                Text("Delivery App")
                    .font(.subheadline)
                    .padding(EdgeInsets(top: 0, leading: 0, bottom: 70, trailing: 0))
                UsernameTextField(username: $username)
                PasswordSecureField(password: $password)
                
                if authenticationDidFail {
                    Text("Information not correct. Try again.")
                        .foregroundColor(Color.red)
                        .offset(y: -10)
                }

                Button(action: logIn) {
                    NeomorphicButtonContent(text: "Log In")
                }
                
            }
            .padding()
            
            if authenticationDidSucceed {
                Text("Login Succeeded")
                    .font(.headline)
                    .foregroundColor(Color("TextColor"))
                    .frame(width: /*@START_MENU_TOKEN@*/250.0/*@END_MENU_TOKEN@*/, height: /*@START_MENU_TOKEN@*/87.0/*@END_MENU_TOKEN@*/)
                    .background(Color("Background"))
                    .cornerRadius(/*@START_MENU_TOKEN@*/20.0/*@END_MENU_TOKEN@*/)
                    .animation(/*@START_MENU_TOKEN@*/.default/*@END_MENU_TOKEN@*/)
                    .shadow(color: Color("LightShadow"), radius: 8, x: -8, y: -8)
                    .shadow(color: Color("DarkShadow"), radius: 8, x: 8, y: 8)
            }
        }
        .offset(y: -keyBoardResponder.currentHeight * 0.82)
    }
}

struct LogInView_Previews: PreviewProvider {
    static var previews: some View {
        LogInView().environmentObject(AppSession())
    }
}

struct UsernameTextField: View {
    @Binding var username: String
    var body: some View {
        TextField("Username", text: $username)
            .padding()
            .background(Color("EntryBackgroundColor"))
            .cornerRadius(/*@START_MENU_TOKEN@*/10.0/*@END_MENU_TOKEN@*/)
            .padding(/*@START_MENU_TOKEN@*/.bottom, 20.0/*@END_MENU_TOKEN@*/)
            .autocapitalization(.none)
    }
}

struct PasswordSecureField: View {
    @Binding var password: String
    var body: some View {
        SecureField("Password", text: $password)
            .padding()
            .background(Color("EntryBackgroundColor"))
            .cornerRadius(10.0)
            .padding(/*@START_MENU_TOKEN@*/.bottom, 20.0/*@END_MENU_TOKEN@*/)
    }
}
