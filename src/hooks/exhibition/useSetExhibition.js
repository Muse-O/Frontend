import { useRef, useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

export const useSetExhibition = () => {
  let authorid = 0;
  const [authorName, setAuthorName] = useState("");
  const [exhibition, setExhibition] = useState({
    startDate: "",
    exhibitionKind: "",
    exhibitionOnlineLink: "",
    endDate: "",
    exhibitionTitle: "",
    exhibitionDesc: "",
    exhibitionCode: "",
    entranceFee: "",
    artWorkCnt: "",
    agencyAndSponsor: "",
    location: "",
    contact: "",
    authors: [],
    exhibitionCategoty: [],
    detailLocation: {
      zonecode: "",
      address: "",
      addressEnglish: "",
      addressType: "",
      buildingName: "",
      buildingCode: "",
      roadAddress: "",
      roadAddressEnglish: "",
      autoJibunAddress: "",
      autoJibunAddressEnglish: "",
      roadname: "",
      roadnameCode: "",
      roadnameEnglish: "",
    },
  });
  //카카오 주소
  const open = useDaumPostcodePopup(process.env.REACT_APP_KAKAO_ADDRESS_URL);
  const handleClick = () => {
    open({
      onComplete: (data) => {
        setExhibition((old) => {
          return {
            ...old,
            detailLocation: {
              zonecode: data.zonecode,
              address: data.address,
              addressEnglish: data.addressEnglish,
              addressType: data.addressType,
              buildingName: data.buildingName,
              buildingCode: data.buildingCode,
              roadAddress: data.roadAddress,
              roadAddressEnglish: data.roadAddressEnglish,
              autoJibunAddress: data.autoJibunAddress,
              autoJibunAddressEnglish: data.autoJibunAddressEnglish,
              roadname: data.roadname,
              roadnameCode: data.roadnameCode,
              roadnameEnglish: data.roadnameEnglish,
            },
          };
        });
      },
    });
  };
  //헨들러
  const onchangeHandler = (event) => {
    const { value, name } = event.target;
    console.log(value, "value");
    console.log(name, "name");
    //작가
    if (name === "author") {
      setAuthorName(value);
      const newarr = [...exhibition.authors];
      newarr.splice(authorid, 1, {
        order: authorid + 1,
        author: value,
      });
      setExhibition((old) => {
        return {
          ...old,
          authors: newarr,
        };
      });
    }
    //카테고리
    else if (name === "exhibitionCategoty") {
      setExhibition((old) => {
        return {
          ...old,
          exhibitionCategoty: [...old.exhibitionCategoty, value],
        };
      });
    }
    //on off 버튼
    else if (name === "EK0001 " || "EK0002 ") {
      setExhibition((old) => {
        return {
          ...old,
          exhibitionKind: name,
        };
      });
    }
    //입장료
    else if (name === "entranceFee") {
      setExhibition((old) => {
        const regex = /^[0-9,]*$/;
        if (!regex.test(value)) {
          const sanitizedValue = value.replace(/[^0-9,]/g, "");
          return {
            ...old,
            entranceFee: sanitizedValue,
          };
        }
        const removedCommaValue = Number(value.replaceAll(",", ""));
        return {
          ...old,
          entranceFee: removedCommaValue.toLocaleString(),
        };
      });
    }
    //기본
    else {
      setExhibition((old) => {
        return { ...old, [name]: value };
      });
    }
  };
  return [
    exhibition,
    setExhibition,
    authorid,
    authorName,
    setAuthorName,
    handleClick,
    onchangeHandler,
  ];
};
