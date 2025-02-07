package com.example.selfcourier.error;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ResponseStatus
@ControllerAdvice
public class RestErrorResponse extends ResponseEntityExceptionHandler {

    @ExceptionHandler(DefaultException.class)
    @ResponseBody
    public ResponseEntity<DefaultMessage> defaultException(DefaultException exception) {
        DefaultMessage message = new DefaultMessage(
                "Failed",
                exception.getMessage(),
                exception.getStatusCode()
        );
        return ResponseEntity.status(exception.getStatusCode()).body(message);
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(
            Exception ex, Object body,
            HttpHeaders headers,
            HttpStatusCode statusCode, WebRequest request
    ) {
        DefaultMessage message = new DefaultMessage(
                "Failed",
                ex.getMessage(),
                statusCode.value()
        );
        return ResponseEntity.status(statusCode.value()).body(message);
    }
}
