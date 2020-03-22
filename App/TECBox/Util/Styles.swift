//
//  Styles.swift
//  TECBox
//
//  Created by Alejandro Ibarra on 3/7/20.
//  Copyright © 2020 Schlafenhase. All rights reserved.
//

import Foundation
import SwiftUI

struct AppLogo: View {
    var body: some View {
        Image("logo-transparent")
            .resizable()
            .aspectRatio(contentMode: /*@START_MENU_TOKEN@*/.fit/*@END_MENU_TOKEN@*/)
            .frame(width: /*@START_MENU_TOKEN@*/150.0/*@END_MENU_TOKEN@*/, height: /*@START_MENU_TOKEN@*/150.0/*@END_MENU_TOKEN@*/)
            .padding(/*@START_MENU_TOKEN@*/.bottom, 18.0/*@END_MENU_TOKEN@*/)
    }
}

struct NeomorphicButtonContent: View {
    var text: String
    
    init(text: String) {
        self.text = text
    }
    
    var body: some View {
        Text(text)
            .font(/*@START_MENU_TOKEN@*/.headline/*@END_MENU_TOKEN@*/)
            .fontWeight(.bold)
            .foregroundColor(Color.white)
            .padding()
            .frame(width: /*@START_MENU_TOKEN@*/220.0/*@END_MENU_TOKEN@*/, height: /*@START_MENU_TOKEN@*/60.0/*@END_MENU_TOKEN@*/)
            .background(Color("Terciary"))
            .cornerRadius(/*@START_MENU_TOKEN@*/20.0/*@END_MENU_TOKEN@*/)
            .shadow(color: Color("LightShadow"), radius: 8, x: -8, y: -8)
            .shadow(color: Color("DarkShadow"), radius: 8, x: 8, y: 8)
            .overlay(
                RoundedRectangle(cornerRadius: 20)
                    .stroke(Color.white, lineWidth: 2)
            )
    }
}

struct WelcomeText: View {
    var body: some View {
        Text("TECBox")
            .font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/)
            .fontWeight(.bold)
            .padding(.bottom, 20)
    }
}

struct WelcomeSubText: View {
    var body: some View {
        Text("Your packages. Delivered.")
            .font(.subheadline)
            .padding(EdgeInsets(top: 0, leading: 0, bottom: 70, trailing: 0))
    }
}
