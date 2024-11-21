import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export class GlobalErrorHandler implements ErrorHandler {
  private readonly snackBar = inject(MatSnackBar);

  handleError(err: Error | HttpErrorResponse) {
    const message = 'An error occurred';

    this.snackBar.open(message, 'Close', { duration: 5000 });
    console.error(err);
  }
}
