import { useEffect, useState, useMemo, useRef } from "react";
import { get } from "../services/apiservices";

const useUsersList = () => {
  const [userData, setUserData] = useState([]);
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === false) {
      const fetchData = async () => {
        try {
          const res = await get("userList");
          setUserData(res?.result?.data || []); // Store the fetched data in state
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  // Memoize the userData so that it doesn't re-compute unless userData changes
  const memoizedUserData = useMemo(() => userData, [userData]);

  return memoizedUserData;
};

export default useUsersList;
