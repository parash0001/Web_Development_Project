package com.example.backendproj.model;



import javax.persistence.*;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.Date;


@Entity
@Table(name = "room_reservations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomReservationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int roomNumber;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date checkInDate;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date checkOutDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoomType type;

    @Column(nullable = false)
    private String status;

    private String email;
    private String phone;

//    @ManyToOne
//    @JoinColumn(name = "customer_id")
//    private UserEntity customer;  // Assuming you have a UserEntity class
}
