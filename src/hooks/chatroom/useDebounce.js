import { useEffect, useState } from "react";

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // delay 시간 후에 setDebouncedValue 함수를 실행하여 debouncedValue 값을 변경한다.
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // useEffect에서 반환하는 함수는 cleanup 함수로서, 컴포넌트가 unmount되거나 re-rendering될 때 실행된다.
      // 이 cleanup 함수에서는 setTimeout 함수를 clear하여 메모리 누수를 방지한다.
      return () => {
        clearTimeout(handler);
      };
    },
    // value와 delay 값이 변경될 때마다 useEffect 함수를 실행한다.
    [value, delay]
  );

  // delay 시간 후에 변경된 debouncedValue 값을 반환한다.
  return debouncedValue;
};
