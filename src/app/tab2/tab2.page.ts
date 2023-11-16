import { Component } from "@angular/core";
import { InfouserService } from "../service/http/infouser.service";

@Component({
	selector: "app-tab2",
	templateUrl: "tab2.page.html",
	styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
	constructor(private infoUser: InfouserService) {
		this.cargarUsuarios();
	}
	public info: any = [];

	cargarUsuarios() {
		this.infoUser.getinfo().subscribe((data) => {
			this.info = data;
			this.info = this.info?.results;
		});
	}
}
