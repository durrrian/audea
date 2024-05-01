export function NextJSLoading() {
  return (
    <div className='min-h-[100dvh] min-w-full flex items-center justify-center select-none overflow-hidden'>
      <div className='loading-animation w-fit h-fit flex items-center justify-center gap-2'>
        <svg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M23.8784 31.2605L18.736 26.1181L16.3259 28.5282L16.1662 28.6879L15.9588 28.8953L15.9532 28.8897C14.9976 29.7444 13.7758 30.2152 12.4811 30.2152C11.0883 30.2152 9.77679 29.6716 8.79316 28.6879C7.80672 27.7015 7.26586 26.3928 7.26586 25C7.26586 23.6072 7.80953 22.2957 8.79316 21.3121C9.7796 20.3256 11.0883 19.7848 12.4811 19.7848C12.6436 19.7848 12.8034 19.7932 12.9659 19.8072L12.9267 19.7483L12.9547 19.7539C11.6516 17.6045 10.9566 15.1524 10.9342 12.6079C8.18785 12.9498 5.61526 14.208 3.6508 16.1697C-1.21693 21.0374 -1.21693 28.9597 3.6508 33.8303C6.00479 36.1843 9.14066 37.4818 12.4811 37.4818C15.8187 37.4818 18.9546 36.1871 21.3086 33.8331L23.8784 31.2605Z'
            fill='#1F365F'
          />
          <path
            d='M33.8827 28.7776L33.835 28.7131L33.8294 28.7103L33.8014 28.6683L24.2229 19.0898L21.0926 15.9595L21.0982 15.9539C20.2435 14.9983 19.7727 13.7765 19.7727 12.4818C19.7727 11.089 20.3164 9.77749 21.3 8.79386C22.2836 7.81022 23.5951 7.26656 24.9879 7.26656C26.3807 7.26656 27.6922 7.81022 28.6758 8.79386C29.6623 9.78029 30.2031 11.089 30.2031 12.4818C30.2031 12.6443 30.1947 12.8041 30.1807 12.9666L30.2396 12.9274L30.234 12.9554C32.3834 11.6523 34.8355 10.9573 37.38 10.9349C37.0381 8.18854 35.7799 5.61596 33.8182 3.6515C31.4642 1.2975 28.3284 0 24.9879 0C21.6475 0 18.5116 1.2975 16.1576 3.6515C13.8036 6.00549 12.5061 9.14135 12.5061 12.4818C12.5061 15.8194 13.8036 18.9553 16.1576 21.3121L16.3678 21.5223L19.0777 24.2321L29.1803 34.3347H29.1186C29.822 35.2427 30.2003 36.3496 30.2003 37.5182C30.2003 38.911 29.6567 40.2197 28.673 41.2061C27.6866 42.1926 26.3779 42.7334 24.9851 42.7334C23.5923 42.7334 22.2808 42.1898 21.2972 41.2061C20.3108 40.2197 19.7699 38.911 19.7699 37.5182C19.7699 37.3557 19.7783 37.1959 19.7923 37.0334L19.7335 37.0726L19.7391 37.0446C17.5896 38.3477 15.1376 39.0427 12.593 39.0651C12.9349 41.8115 14.1932 44.384 16.1548 46.3485C18.5088 48.7025 21.6447 50 24.9851 50C28.3256 50 31.4614 48.7025 33.8154 46.3485C38.6551 41.5088 38.6831 33.6509 33.8995 28.7748H33.8827V28.7776Z'
            fill='#1F365F'
          />
          <path
            d='M46.3423 16.1725C41.4745 11.3047 33.5522 11.3048 28.6845 16.1697L26.1119 18.7422L31.2543 23.8846L34.0342 21.1047L34.0398 21.1103C34.9954 20.2555 36.2173 19.7847 37.512 19.7847C38.9048 19.7847 40.2135 20.3284 41.1999 21.312C42.1863 22.2985 42.7272 23.6072 42.7272 25C42.7272 26.3927 42.1835 27.7043 41.1999 28.6879C40.2135 29.6743 38.9048 30.2152 37.512 30.2152C37.3494 30.2152 37.1897 30.2068 37.0272 30.1928L37.0664 30.2516L37.0384 30.246C38.3415 32.3954 39.0365 34.8475 39.0589 37.3921C41.8052 37.0502 44.3778 35.7919 46.3423 33.8302C51.2128 28.9653 51.2128 21.0402 46.3423 16.1725Z'
            fill='#1F365F'
          />
        </svg>
        <svg width='172' height='50' viewBox='0 0 172 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M36.7378 14.6632V29.6276H31.9495V27.5333C31.3499 28.371 30.6039 29.0337 29.706 29.5243C28.808 30.012 27.8412 30.2559 26.8026 30.2559C25.6665 30.2559 24.6365 29.9604 23.7213 29.3723C22.8033 28.7841 22.0803 27.9608 21.5524 26.9021C21.0245 25.8435 20.7606 24.627 20.7606 23.2499V14.6632H25.5202V23.1323C25.5202 24.0705 25.764 24.8078 26.2546 25.3471C26.7423 25.8865 27.4252 26.1562 28.3059 26.1562C29.3445 26.1562 30.2109 25.7861 30.9109 25.0488C31.6081 24.3114 31.9581 23.3618 31.9581 22.2056V14.6632H36.7378Z'
            fill='#1F365F'
          />
          <path
            d='M44.3376 14.6632V16.4878C44.6761 15.7505 45.2298 15.1624 45.9987 14.7234C46.7676 14.2845 47.6885 14.0636 48.7672 14.0636C50.1443 14.0636 51.3895 14.4193 52.5084 15.1251C53.6244 15.8337 54.4994 16.8149 55.1277 18.0744C55.756 19.331 56.0716 20.7368 56.0716 22.2946C56.0716 23.9098 55.7474 25.3185 55.099 26.5148C54.4506 27.7112 53.5727 28.6292 52.4653 29.269C51.3579 29.9059 50.1271 30.2272 48.7701 30.2272C46.7532 30.2272 45.2786 29.4784 44.3405 27.9837V35.6151H39.5522V14.6632H44.3376ZM45.4307 24.8365C46.059 25.4562 46.8909 25.7631 47.9295 25.7631C48.948 25.7631 49.7599 25.4533 50.3681 24.8365C50.9763 24.2168 51.2804 23.3704 51.2804 22.2917C51.2804 21.1958 50.9706 20.2978 50.3538 19.5978C49.7341 18.9006 48.9279 18.5506 47.9295 18.5506C46.911 18.5506 46.0848 18.9006 45.445 19.5978C44.8052 20.2978 44.4868 21.1929 44.4868 22.2917C44.4868 23.3704 44.8024 24.2197 45.4307 24.8365Z'
            fill='#1F365F'
          />
          <path
            d='M71.3488 15.0648C72.5967 15.7333 73.5636 16.6801 74.2521 17.908C74.9407 19.1359 75.285 20.5474 75.285 22.1425C75.285 22.5413 75.2563 22.9717 75.196 23.4307L63.9124 23.402C64.1305 24.1393 64.5264 24.7131 65.0944 25.1234C65.6625 25.5336 66.3453 25.7373 67.1457 25.7373C67.8429 25.7373 68.4511 25.6025 68.9704 25.3328C69.4897 25.0631 69.8684 24.6902 70.1065 24.2111L74.5046 26.1877C74.0054 27.4042 73.0988 28.3825 71.782 29.1198C70.4651 29.8571 68.9675 30.2272 67.2921 30.2272C65.6568 30.2272 64.2108 29.883 62.9513 29.1944C61.6947 28.5059 60.7107 27.539 60.0021 26.291C59.2934 25.043 58.9406 23.6229 58.9406 22.0249C58.9406 20.4298 59.2705 19.0326 59.9275 17.8362C60.5873 16.6399 61.5226 15.7103 62.7419 15.0534C63.9583 14.3935 65.3756 14.0664 66.9908 14.0664C68.6491 14.0636 70.1008 14.3964 71.3488 15.0648ZM65.1977 19.0469C64.6584 19.3769 64.2711 19.8388 64.0301 20.4384H70.1954C69.9573 19.8388 69.5729 19.3769 69.0421 19.0469C68.5142 18.717 67.8802 18.5535 67.1429 18.5535C66.3855 18.5535 65.7371 18.717 65.1977 19.0469Z'
            fill='#1F365F'
          />
          <path
            d='M94.5614 15.4263C95.8295 16.353 96.6299 17.5953 96.9713 19.1531L92.6622 20.7683C92.5015 20.2089 92.1687 19.7613 91.6609 19.4228C91.1531 19.0842 90.5477 18.915 89.8506 18.915C88.8924 18.915 88.1091 19.2305 87.5009 19.8588C86.8927 20.4871 86.5886 21.3105 86.5886 22.329V26.0414H90.1805V29.6334H77.7867V26.0414H81.7085V22.0306C81.7085 20.3953 82.0987 18.9379 82.8762 17.6612H77.4883V14.0693H83.0254V17.4202C83.7225 16.3415 84.6664 15.5095 85.8542 14.9214C87.0419 14.3333 88.3731 14.0378 89.8506 14.0378C91.724 14.032 93.2962 14.4968 94.5614 15.4263Z'
            fill='#1F365F'
          />
          <path
            d='M99.6079 17.8506C100.268 16.6428 101.203 15.7103 102.422 15.0534C103.639 14.3935 105.065 14.0664 106.703 14.0664C108.579 14.0664 110.194 14.4911 111.551 15.3374C112.908 16.1866 113.875 17.3686 114.455 18.8834L109.905 20.4384C109.704 19.8789 109.311 19.4256 108.723 19.0756C108.134 18.7256 107.46 18.5506 106.703 18.5506C105.704 18.5506 104.907 18.8691 104.307 19.5088C103.708 20.1486 103.409 21.0064 103.409 22.0823C103.409 23.1811 103.725 24.0619 104.353 24.7303C104.981 25.3988 105.793 25.7316 106.792 25.7316C107.609 25.7316 108.304 25.5164 108.872 25.0889C109.44 24.6615 109.824 24.0676 110.025 23.3073L114.455 25.1922C113.895 26.7701 112.934 28.0009 111.566 28.8874C110.2 29.7739 108.576 30.2186 106.703 30.2186C105.088 30.2186 103.67 29.883 102.454 29.2145C101.237 28.546 100.294 27.5993 99.6251 26.3714C98.9566 25.1434 98.621 23.7119 98.621 22.0766C98.621 20.4671 98.9509 19.0555 99.6079 17.8506Z'
            fill='#1F365F'
          />
          <path
            d='M132.807 14.6632V29.6276H128.019V27.5333C127.419 28.371 126.674 29.0337 125.776 29.5243C124.878 30.012 123.911 30.2559 122.872 30.2559C121.736 30.2559 120.706 29.9604 119.791 29.3723C118.873 28.7841 118.15 27.9608 117.622 26.9021C117.094 25.8435 116.827 24.627 116.827 23.2499V14.6632H121.587V23.1323C121.587 24.0705 121.831 24.8078 122.318 25.3471C122.806 25.8865 123.492 26.1562 124.37 26.1562C125.405 26.1562 126.275 25.7861 126.975 25.0488C127.672 24.3114 128.022 23.3618 128.022 22.2056V14.6632H132.807Z'
            fill='#1F365F'
          />
          <path
            d='M137.432 28.8329C136.305 27.9062 135.742 26.6927 135.742 25.198C135.742 22.3663 137.808 20.7482 141.936 20.3494C143.374 20.2089 144.349 20.0453 144.868 19.856C145.388 19.6666 145.646 19.4113 145.646 19.0928C145.646 18.7342 145.402 18.4502 144.911 18.2408C144.421 18.0313 143.798 17.9252 143.041 17.9252C142.344 17.9252 141.764 18.0256 141.305 18.2236C140.846 18.4244 140.556 18.6941 140.439 19.0326L136.279 17.9252C136.439 17.1678 136.873 16.4936 137.581 15.9054C138.29 15.3173 139.176 14.8583 140.244 14.5283C141.311 14.1984 142.444 14.0349 143.64 14.0349C145.875 14.0349 147.597 14.5943 148.802 15.7104C150.01 16.8292 150.612 18.3354 150.612 20.2289V24.4779C150.612 24.957 150.821 25.307 151.24 25.525C151.478 25.6254 151.748 25.6742 152.049 25.6742C152.247 25.6742 152.399 25.6656 152.5 25.6455V29.5358C151.88 29.8543 151.243 30.0149 150.583 30.0149C150.185 30.0149 149.806 29.9547 149.447 29.8342C148.908 29.6735 148.449 29.4268 148.07 29.0854C147.691 28.7469 147.462 28.3681 147.382 27.9493C147.201 28.6091 146.613 29.1514 145.617 29.5817C144.619 30.0092 143.572 30.2243 142.476 30.2243C140.241 30.2243 138.56 29.7596 137.432 28.8329ZM144.84 25.5853C145.477 25.0258 145.798 24.2799 145.798 23.3417C145.617 23.5627 145.25 23.7348 144.691 23.8668C144.131 23.9959 143.374 24.1106 142.415 24.211C141.159 24.3315 140.531 24.7016 140.531 25.3185C140.531 25.657 140.694 25.9267 141.024 26.1275C141.354 26.3283 141.816 26.4259 142.415 26.4259C143.394 26.423 144.2 26.1447 144.84 25.5853Z'
            fill='#1F365F'
          />
          <path
            d='M168.468 14.9157C169.395 15.5038 170.124 16.3272 170.655 17.3858C171.182 18.4445 171.446 19.6609 171.446 21.038V29.6276H166.658V21.1585C166.658 20.2203 166.414 19.483 165.924 18.9436C165.433 18.4043 164.75 18.1346 163.872 18.1346C162.834 18.1346 161.967 18.5047 161.267 19.242C160.57 19.9793 160.22 20.929 160.22 22.0851V29.6276H155.432V14.6632H160.22V16.7575C160.82 15.9198 161.566 15.2571 162.464 14.7665C163.362 14.2787 164.328 14.032 165.367 14.032C166.509 14.032 167.539 14.3275 168.468 14.9157Z'
            fill='#1F365F'
          />
          <path
            d='M18.0093 7.68877C18.0093 5.49403 16.8502 3.47717 15.4301 2.26073C13.7259 0.803307 11.4537 0 9.0352 0C6.61667 0 4.34447 0.803307 2.64032 2.26073C0.936163 3.71816 -0.00485229 5.66043 -0.00485229 7.72607C-0.00485229 9.79171 0.933294 11.734 2.64032 13.1914L2.79237 13.3205L4.75473 14.9988L12.0734 21.2532H12.0304C12.5382 21.8155 12.8136 22.5012 12.8136 23.2241C12.8136 24.0877 12.4206 24.8967 11.7062 25.5078C10.9918 26.1189 10.0451 26.4546 9.0352 26.4546C8.02533 26.4546 7.07858 26.1189 6.36421 25.5078C5.3945 24.7762 5.2568 23.2241 5.2568 23.2241C5.2568 23.2241 1.90299 23.2299 0.0611279 23.2413C0.0611279 25.6025 1.22019 27.473 2.64032 28.6895C4.34447 30.1469 6.61667 30.9502 9.0352 30.9502C11.4537 30.9502 13.7259 30.1469 15.4301 28.6895C18.9359 25.6943 18.956 20.8286 15.4903 17.8104H15.4731L15.4387 17.7703L15.433 17.7674L15.4129 17.7416L8.47576 11.8143L6.20929 9.87778L6.21503 9.87491C5.59533 9.28391 5.2568 8.52651 5.2568 7.72607C5.2568 6.86252 5.64984 6.05348 6.36421 5.44239C7.07858 4.83131 8.02533 4.49564 9.0352 4.49564C10.0451 4.49564 10.9918 4.83131 11.7062 5.44239C12.4206 6.05348 12.8136 6.86252 12.8136 7.72607'
            fill='#1F365F'
          />
          <path
            d='M58.5676 46.9302C58.8402 48.1065 59.7382 48.6975 61.2644 48.6975C62.0075 48.6975 62.6301 48.5741 63.1321 48.3245C63.6342 48.0778 63.8838 47.7364 63.8838 47.3032C63.8838 46.956 63.6944 46.6663 63.3157 46.4282C62.937 46.1929 62.2772 45.9892 61.3362 45.8142C59.9591 45.5675 58.975 45.2203 58.3811 44.7728C57.7873 44.3252 57.4889 43.7314 57.4889 42.9883C57.4889 42.0846 57.8303 41.4132 58.5103 40.98C59.1931 40.5468 60.1341 40.3288 61.3362 40.3288C62.4637 40.3288 63.3444 40.5239 63.9756 40.914C64.6068 41.3042 64.9683 41.8464 65.0543 42.5407L63.66 42.9883C63.5596 42.0846 62.785 41.6313 61.3362 41.6313C60.6419 41.6313 60.0738 41.7432 59.6349 41.9669C59.1959 42.1907 58.975 42.5321 58.975 42.9883C58.975 43.324 59.1357 43.6108 59.4599 43.8518C59.7812 44.0928 60.4066 44.308 61.3362 44.4945C62.7133 44.767 63.7289 45.1257 64.3859 45.5732C65.0428 46.0208 65.3699 46.5946 65.3699 47.3032C65.3699 48.184 65.0084 48.8524 64.2826 49.3115C63.5567 49.7705 62.5755 50 61.3362 50C60.1226 50 59.1615 49.7733 58.4557 49.3201C57.75 48.8668 57.3397 48.2442 57.2278 47.4524L58.5676 46.9302Z'
            fill='#1F365F'
          />
          <path
            d='M68.0007 49.2254C67.3609 48.7119 67.0425 48.0319 67.0425 47.1884C67.0425 46.3708 67.3523 45.6995 67.972 45.1716C68.5917 44.6437 69.4094 44.351 70.425 44.2879C71.7131 44.2133 72.6484 44.0728 73.2337 43.8691C73.8161 43.6654 74.1087 43.3584 74.1087 42.9481C74.1087 42.5522 73.8534 42.2309 73.3456 41.9899C72.8378 41.7489 72.198 41.6284 71.432 41.6284C70.6373 41.6284 70.0004 41.7604 69.5184 42.0272C69.0335 42.294 68.7552 42.6555 68.6807 43.1145L67.3036 42.667C67.404 41.9612 67.8257 41.3932 68.5688 40.9657C69.3118 40.5382 70.2672 40.323 71.432 40.323C72.7201 40.323 73.7243 40.587 74.4444 41.112C75.1616 41.6399 75.5231 42.3743 75.5231 43.3154V46.9417C75.5231 47.7364 75.6407 48.2385 75.876 48.4479C75.9764 48.5483 76.0997 48.5971 76.2489 48.5971C76.3121 48.5971 76.4038 48.5856 76.5272 48.5598V49.8623C76.3149 49.9254 76.117 49.9541 75.9333 49.9541C75.5977 49.9541 75.2878 49.868 75.0038 49.693C74.496 49.3717 74.2177 48.8496 74.1661 48.1323C74.0427 48.6889 73.6468 49.1393 72.9755 49.4807C72.307 49.8221 71.5123 49.9914 70.5971 49.9914C69.504 49.9971 68.6405 49.7389 68.0007 49.2254ZM72.4189 48.204C72.9525 47.877 73.3685 47.4179 73.664 46.8269C73.9624 46.2388 74.1116 45.5531 74.1116 44.7728C73.8993 45.008 73.5005 45.1888 72.9123 45.3121C72.3242 45.4355 71.4951 45.5302 70.4307 45.5904C69.8598 45.6162 69.4008 45.7769 69.0565 46.0724C68.7093 46.3708 68.5343 46.7409 68.5343 47.1884C68.5343 47.6475 68.7208 48.0118 69.0909 48.2844C69.4639 48.5569 69.9659 48.6946 70.5971 48.6946C71.277 48.6946 71.8853 48.5311 72.4189 48.204Z'
            fill='#1F365F'
          />
          <path
            d='M86.4653 41.4907C87.1768 42.2653 87.5354 43.2924 87.5354 44.5691V49.8135H86.0493V44.5691C86.0493 43.6768 85.8054 42.9654 85.3148 42.4317C84.8243 41.8981 84.1529 41.6313 83.298 41.6313C82.6295 41.6313 82.0328 41.7948 81.5135 42.1248C80.9942 42.4547 80.584 42.9194 80.2856 43.5191C79.9872 44.1215 79.838 44.8101 79.838 45.5933V49.8135H78.3519V36.7971H79.838V42.2625C80.0991 41.6915 80.5782 41.2268 81.2782 40.8682C81.9783 40.5095 82.7443 40.3288 83.5734 40.3288C84.787 40.3288 85.7509 40.7161 86.4653 41.4907Z'
            fill='#1F365F'
          />
          <path
            d='M90.3125 49.2254C89.6728 48.7119 89.3543 48.0319 89.3543 47.1884C89.3543 46.3708 89.6642 45.6995 90.2838 45.1716C90.9035 44.6437 91.7212 44.351 92.7368 44.2879C94.025 44.2133 94.9602 44.0728 95.5455 43.8691C96.1279 43.6654 96.4205 43.3584 96.4205 42.9481C96.4205 42.5522 96.1652 42.2309 95.6574 41.9899C95.1496 41.7489 94.5098 41.6284 93.7438 41.6284C92.9491 41.6284 92.3122 41.7604 91.8302 42.0272C91.3454 42.294 91.0671 42.6555 90.9925 43.1145L89.6154 42.667C89.7158 41.9612 90.1375 41.3932 90.8806 40.9657C91.6236 40.5382 92.579 40.323 93.7438 40.323C95.032 40.323 96.0361 40.587 96.7562 41.112C97.4734 41.6399 97.8349 42.3743 97.8349 43.3154V46.9417C97.8349 47.7364 97.9525 48.2385 98.1878 48.4479C98.2882 48.5483 98.4116 48.5971 98.5608 48.5971C98.6239 48.5971 98.7157 48.5856 98.8391 48.5598V49.8623C98.6267 49.9254 98.4288 49.9541 98.2452 49.9541C97.9095 49.9541 97.5997 49.868 97.3156 49.693C96.8078 49.3717 96.5296 48.8496 96.4779 48.1323C96.3545 48.6889 95.9586 49.1393 95.2873 49.4807C94.6188 49.8221 93.8241 49.9914 92.9089 49.9914C91.8159 49.9971 90.9523 49.7389 90.3125 49.2254ZM94.7278 48.204C95.2615 47.877 95.6775 47.4179 95.973 46.8269C96.2713 46.2388 96.4205 45.5531 96.4205 44.7728C96.2082 45.008 95.8094 45.1888 95.2213 45.3121C94.6332 45.4355 93.804 45.5302 92.7397 45.5904C92.1687 45.6162 91.7097 45.7769 91.3654 46.0724C91.0183 46.3708 90.8433 46.7409 90.8433 47.1884C90.8433 47.6475 91.0298 48.0118 91.3999 48.2844C91.7728 48.5569 92.2749 48.6946 92.9061 48.6946C93.5889 48.6946 94.1971 48.5311 94.7278 48.204Z'
            fill='#1F365F'
          />
          <path
            d='M100.735 40.5153H102.222V42.0014C102.445 41.4821 102.764 41.0718 103.18 40.7735C103.596 40.4751 104.081 40.3259 104.64 40.3259C105.309 40.3259 105.92 40.5296 106.47 40.9399C107.021 41.3501 107.371 41.8694 107.52 42.5006C107.67 41.8436 108 41.3157 108.516 40.9198C109.03 40.5239 109.661 40.3259 110.404 40.3259C111.098 40.3259 111.715 40.5038 112.254 40.8567C112.794 41.2095 113.218 41.7087 113.528 42.3543C113.838 42.9998 113.993 43.7371 113.993 44.5662V49.8107H112.507V44.5662C112.507 43.674 112.32 42.9625 111.95 42.4289C111.577 41.8952 111.064 41.6284 110.407 41.6284C109.738 41.6284 109.184 41.901 108.751 42.4461C108.318 42.9912 108.1 43.6969 108.1 44.5662V49.8107H106.614V44.5662C106.614 43.674 106.422 42.9625 106.037 42.4289C105.653 41.8952 105.125 41.6284 104.456 41.6284C103.799 41.6284 103.263 41.8866 102.847 42.4002C102.431 42.9137 102.224 43.5822 102.224 44.3998V49.8107H100.738V40.5153H100.735Z'
            fill='#1F365F'
          />
        </svg>
      </div>
    </div>
  )
}