package com.example.selfcourier.model.post;

import com.example.selfcourier.entity.Location;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocationDTO {
    private String address; // address address
//    private String city;
//    private String area;
//    private double lat;
//    private double lon;

    public Location toEntity(){
        return Location
                .builder()
                .address(address)
//                .area(area)
//                .latitude(lat)
//                .longitude(lon)
//                .city(city)
                .build();
    }

    public static LocationDTO from(Location location){
        return LocationDTO.builder()
                .address(location.getAddress())
//                .area(location.getArea())
//                .city(location.getCity())
//                .lat(location.getLatitude())
//                .lon(location.getLongitude())
                .build();
    }
}
