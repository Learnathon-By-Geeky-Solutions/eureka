package com.example.selfcourier.error;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DefaultMessage {
    private String status;
    private String message;
    private Integer statusCode;
}
