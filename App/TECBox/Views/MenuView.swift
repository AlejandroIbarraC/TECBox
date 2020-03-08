//
//  MenuView.swift
//  TECBox
//
//  Created by Alejandro Ibarra on 3/6/20.
//  Copyright © 2020 Schlafenhase. All rights reserved.
//

import SwiftUI

struct MenuView: View {
    @EnvironmentObject var session: Session
    
    var body: some View {
        ZStack {
            Color("Background").edgesIgnoringSafeArea(.all)
            TabView {
                PackageView()
                    .tabItem {
                        Image(systemName: "cube.box")
                        Text("Packages")
                    }
                SettingsView()
                    .tabItem{
                        Image(systemName: "gear")
                        Text("Settings")
                    }
            }
        }
    }
}

struct MenuView_Previews: PreviewProvider {
    static var previews: some View {
        MenuView().environmentObject(Session())
    }
}
