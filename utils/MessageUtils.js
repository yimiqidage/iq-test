
export default  class MessageUtils {

    static isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';


     /**
     * 创建并显示自定义弹窗
     */
     static createCustomPopup = (msg, type = 'success') => {
        if (!MessageUtils.isBrowser) {
            console.warn('MessageUtils: createCustomPopup can only be used in a browser environment');
            return;
        }
        // 创建弹窗容器
        const container = document.createElement("div");
        container.style.position = 'fixed';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';
        container.style.zIndex = '1000';

        if (type === 'success') {
            container.innerHTML = `
                <div role="alert" class="alert alert-success">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>${msg}</span>
                    </div>
            `;
        } else if (type === 'error') {
            container.innerHTML = `
                 
                <div role="alert" class="alert alert-error">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>${msg}</span>
                </div>
            `;
        }

        // 将弹窗添加到 body
        document.body.appendChild(container);

        // 3秒后自动关闭弹窗
        setTimeout(() => {
            container.remove();
        }, 3000);
    }
    /**
     * 成功消息提示
     * @param msg
     */
    static successMsg = (msg) => {
        if (MessageUtils.isBrowser) {
            MessageUtils.createCustomPopup(msg, 'success');
        }
        

    }

    /**
     * 错误消息提示
     * @param msg
     */
    static errorMsg = (msg) => {
        if (MessageUtils.isBrowser) {
            MessageUtils.createCustomPopup(msg, 'error');
        }
       

    }

    /**
     * 是否为成功响应
     */
    static isSuccessResp = (resp) => {
        return resp.errCode === 'E0000';
    }
    
    
}





