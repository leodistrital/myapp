import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class InfouserService {
	constructor(private http: HttpClient) {}

	public URL: string = "https://express-server-7e8p.onrender.com";
	public httpHeader = {
		headers: new HttpHeaders({ "Content-Type": "application/json" }),
	};

	getinfo() {
		// console.log("getinfo");
		return this.http.get("https://randomuser.me/api/?results=8");
	}

	login(user: string, password: string) {
		return this.http.post(
			`${this.URL}/login`,
			{ username: user, password: password },
			this.httpHeader
		);
		// console.log({ user, password });
	}
}
