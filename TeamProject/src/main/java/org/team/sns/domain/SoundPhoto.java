package org.team.sns.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;
/**
 * 
 * @author MinJeongKim
 * @since 18.08.10
 * @version 18.08.11
 *
 */

//[ 음성사진 테이블 ]

@Entity
@Data
@Table(name="SoundPhotos")
public class SoundPhoto {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="SoundPhotos_seq", initialValue=1, allocationSize=1)

	private String url;
	private String type;

}
