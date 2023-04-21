import { useEffect, useRef, useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

export const useSetExhibition = (
  DetailLoading,
  Detaildata,
  setFiles,
  setPostFiles
) => {
  const info = Detaildata?.exhibitionInfo;
  const ExAddress = Detaildata?.exhibitionInfo.ExhibitionAddress;
  let authorid = 0;
  const templete = {
    startDate: "",
    endDate: "",
    exhibitionLink: "", //
    exhibitionTitle: "",
    exhibitionEngTitle: "",
    exhibitionDesc: "",
    exhibitionHost: "",
    entranceFee: "",
    openTime: "", //
    closeTime: "", //
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
  };
  const [exhibitionKind, setExhibitionKind] = useState("EK0001");
  const [authorName, setAuthorName] = useState("");
  const [exhibition, setExhibition] = useState({ ...templete });
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
          exhibitionCategoty: [value],
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
    //연락처
    else if (name === "contact") {
      const number = value.replace(/[^0-9]/g, "");
      let result = [];
      let restNumber = "";
      if (number.startsWith("02")) {
        // 서울 02 지역번호
        result.push(number.substr(0, 2));
        restNumber = number.substring(2);
      } else if (number.startsWith("1")) {
        // 지역 번호가 없는 경우
        // 1xxx-yyyy
        restNumber = number;
      } else {
        // 나머지 3자리 지역번호
        // 0xx-yyyy-zzzz
        result.push(number.substr(0, 3));
        restNumber = number.substring(3);
      }

      if (restNumber.length === 7) {
        // 7자리만 남았을 때는 xxx-yyyy
        result.push(restNumber.substring(0, 3));
        result.push(restNumber.substring(3));
      } else {
        result.push(restNumber.substring(0, 4));
        result.push(restNumber.substring(4));
      }
      setExhibition((old) => {
        return {
          ...old,
          [name]: result.filter((val) => val).join("-"),
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
  //online,offline 변환
  const changeOnOff = (event) => {
    const { name } = event.target;
    if (
      exhibitionKind !== name &&
      JSON.stringify(templete) !== JSON.stringify(exhibition)
    ) {
      if (window.confirm("기존데이터가 삭제 됩니다.정말로 진행하시겠습니까?")) {
        setExhibitionKind(name);
        setExhibition(templete);
      }
    } else {
      setExhibitionKind(name);
    }
  };
  useEffect(() => {
    // 서버에서 받아온 데이터가 로딩되면 exhibition state를 업데이트
    //!나중에 필수값 유효성검사 필요!
    //!작가,이미지 order없이 받는데 어떻게 해야 하는가?
    if (!DetailLoading && Detaildata) {
      //!value값 따로??
      setAuthorName(info.ExhibitionAuthors[authorid].author);
      const newarr = [...exhibition.authors];
      newarr.splice(authorid, 1, {
        order: authorid + 1,
        author: info.ExhibitionAuthors[authorid].author,
      });
      const newExCodeArr = info.ExhibitionCategories.map(
        (item) => item.categoryCode
      );
      //TODO 디테일한 유효성 검사 필요
      setExhibition((prevExhibition) => ({
        ...prevExhibition,
        startDate: info.startDate.slice(0, 10), //
        endDate: info.endDate.slice(0, 10), //
        exhibitionTitle: info.exhibitionTitle, //
        exhibitionEngTitle: info.exhibitionEngTitle, //
        exhibitionDesc: info.exhibitionDesc, //
        exhibitionHost: info.exhibitionHost, //
        // exhibitionCode: info.exhibitionStatus,
        entranceFee: info.entranceFee, //
        artWorkCnt: info.artWorkCnt, //
        agencyAndSponsor: info.agencyAndSponsor, //
        location: info.location, //
        contact: info.contact, //
        authors: newarr, //
        exhibitionCategoty: newExCodeArr, //
        detailLocation: {
          //
          zonecode: ExAddress.zonecode,
          address: ExAddress.address,
          addressEnglish: ExAddress.addressEnglish,
          addressType: ExAddress.addressType,
          buildingName: ExAddress.buildingName,
          buildingCode: ExAddress.buildingCode,
          roadAddress: ExAddress.roadAddress,
          roadAddressEnglish: ExAddress.roadAddressEnglish,
          autoJibunAddress: ExAddress.autoJibunAddress,
          autoJibunAddressEnglish: ExAddress.autoJibunAddressEnglish,
          roadname: ExAddress.roadname,
          roadnameCode: ExAddress.roadnameCode,
          roadnameEnglish: ExAddress.roadnameEnglish,
        },
      }));
      setExhibitionKind(info.exhibitionKind);
      //*썸네일 미리보기 가지고 와보기
      setPostFiles([{ preview: info?.postImage }]);
      //*일반 파일 미리보기 가지고 와보기
      const previewFileArr = info?.ExhibitionImgs.map((file) => {
        return {
          order: file.order,
          preview: file.imgUrl,
          imgCaption: file.imgCaption,
        };
      });
      setFiles(previewFileArr);
    }
    // clean-up 함수
    return () => {
      setExhibition({ ...templete });
    };
  }, [DetailLoading, Detaildata]);
  return [
    exhibition,
    exhibitionKind,
    changeOnOff,
    authorName,
    handleClick,
    onchangeHandler,
  ];
};
