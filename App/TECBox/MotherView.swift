//
//  MotherView.swift
//  TECBox
//
//  Created by Alejandro Ibarra on 3/6/20.
//  Copyright © 2020 Schlafenhase. All rights reserved.
//

import SwiftUI

struct MotherView : View {
    @EnvironmentObject var viewRouter: Session
    
    func getUser() {
        viewRouter.listen()
    }

    var body: some View {
        Group {
            if viewRouter.currentPage == "menu" && viewRouter.session != nil {
                MenuView()
                    .transition(.scale)
            } else {
                LogInView()
            }
        }.onAppear(perform: getUser)
    }
}

struct MotherView_Previews : PreviewProvider {
    static var previews: some View {
        MotherView().environmentObject(Session())
    }
}
