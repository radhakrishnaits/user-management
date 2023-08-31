import { TestBed } from '@angular/core/testing';
import { SnackBarService } from './snack-bar.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

describe('SnackBarService', () => {
    let service: SnackBarService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MatSnackBar,
                SnackBarService
            ]
        });
        service = TestBed.inject(SnackBarService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('openSuccessSnackBar()', () => {
        it('should open success snack bar', () => {
            // Given
            let config = new MatSnackBarConfig();
            config.panelClass = ['snackbar-success'];
            config.duration = 2000;
            const message = 'Something new';
            const action = '';
            const openSnackBar = spyOn(service['snackBar'], 'open');

            // When
            service.openSuccessSnackBar(message, action);

            // Then
            expect(openSnackBar).toHaveBeenCalledWith(message, action, config);
        });
    });

    describe('openErrorSnackBar()', () => {
        it('should open error snack bar', () => {
            // Given
            let config = new MatSnackBarConfig();
            config.panelClass = ['snackbar-error'];
            config.duration = 2000;
            const message = 'Something new';
            const action = '';
            const openSnackBar = spyOn(service['snackBar'], 'open');

            // When
            service.openErrorSnackBar(message, action);

            // Then
            expect(openSnackBar).toHaveBeenCalledWith(message, action, config);
        });
    });
});
