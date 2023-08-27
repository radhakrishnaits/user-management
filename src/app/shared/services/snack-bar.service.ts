import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable()
export class SnackBarService {
    constructor(private snackBar: MatSnackBar) {}

    openSuccessSnackBar(message: string, action: string) {
        let config = new MatSnackBarConfig();
        config.panelClass = ['snackbar-success'];
        config.duration = 2000;
        this.snackBar.open(message, action, config);
    }

    openErrorSnackBar(message: string, action: string) {
        let config = new MatSnackBarConfig();
        config.panelClass = ['snackbar-error'];
        config.duration = 2000;
        this.snackBar.open(message, action, config);
    }
}