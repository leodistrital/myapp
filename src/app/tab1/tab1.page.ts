import { Component } from "@angular/core";
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder,
} from "@angular/forms";
import { AlertController, NavController } from "@ionic/angular";
import { InfouserService } from "../service/http/infouser.service";

@Component({
	selector: "app-tab1",
	templateUrl: "tab1.page.html",
	styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
	formularioLogin: FormGroup;

	constructor(
		public fb: FormBuilder,
		public alertController: AlertController,
		public navCtr: NavController,
		private infoUser: InfouserService
	) {
		this.formularioLogin = this.fb.group({
			email: new FormControl("", Validators.required),
			password: new FormControl("", Validators.required),
		});
	}

	public info: any = [];

	async login() {
		if (this.formularioLogin.invalid) {
			console.log("Formulário No válido");
			const alert = await this.alertController.create({
				message: "Complete la Información",
				htmlAttributes: {
					"aria-label": "alert dialog",
				},
			});
		}

		if (this.formularioLogin.valid) {
			this.verificarLogin();
		}
	}

	verificarLogin() {
		this.infoUser
			.login(
				this.formularioLogin.value.email,
				this.formularioLogin.value.password
			)
			.subscribe(async (data) => {
				this.info = data;
				if (this.info.login) {
					localStorage.setItem("active", "true");
					this.navCtr.navigateRoot("/tabs/info");
				} else {
					const alert = await this.alertController.create({
						header: "Mensaje",
						message: "Usuario no valido",
						htmlAttributes: {
							"aria-label": "alert dialog",
						},
						buttons: [
							{
								text: "Intentar de nuevo",
								htmlAttributes: {
									"aria-label": "close",
								},
							},
						],
					});
					alert.present();
				}
			});
	}
}
