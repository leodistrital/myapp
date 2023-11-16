import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
	{
		path: "tabs",
		component: TabsPage,
		children: [
			{
				path: "login",
				loadChildren: () =>
					import("../tab1/tab1.module").then((m) => m.Tab1PageModule),
			},
			{
				path: "info",
				loadChildren: () =>
					import("../tab2/tab2.module").then((m) => m.Tab2PageModule),
				canActivate: [AuthGuard],
			},

			{
				path: "",
				redirectTo: "/tabs/login",
				pathMatch: "full",
			},
		],
	},
	{
		path: "",
		redirectTo: "tabs/login",
		pathMatch: "full",
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
