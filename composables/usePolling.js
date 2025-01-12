// composables/usePolling.js

/**
 * 添加轮询公共函数
 * @returns 
 */
export default function usePolling() {
    const startPolling = async (maxRetries, interval, apiCall, shouldContinue, onComplete) => {
      let attempts = 0;
      if(!maxRetries || !interval){
        console.log("maxRetries or interval not valid,",maxRetries,interval)
        return ;
      }
      
      console.log("loop for:",maxRetries,interval)
  
      const poll = async () => {
        try {
          const result = await apiCall();
          // const result = JSON.parse(response);
          // console.log("result=",result)
        
          
          if (!shouldContinue(result) || attempts >= maxRetries) {
            console.log("stop loop...")
            if (onComplete) {
              console.log("start to callback",maxRetries,interval)
              onComplete(result);
            }
            return;
          }
  
          attempts++;
          setTimeout(poll, interval);
        } catch (error) {
          if (onComplete) {
            onComplete(null, error);
          }
        }
      };
  
      poll();
    };
  
    return {
      startPolling,
    };
  }
  