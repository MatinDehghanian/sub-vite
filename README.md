
## Desktop
<img src="https://raw.githubusercontent.com/MatinDehghanian/sub-vite/assets/images/desktop.png" title="Marzneshin-Sub-Desktop"/>

## Responsive Mobile
<img src="https://raw.githubusercontent.com/MatinDehghanian/sub-vite/assets/images/web-Mobile.JPEG" title="Marzneshin-Sub-Mobile"/>

# ساخته شده توسط
- React 18
- Vite 5
- React Bootstarp
- FontAwesome Icons

# ویژگی ها
- افزودن سریع لینک اشتراک
- لیست اپلیکیشن های قابل تغییر و توسعه
- اطلاعات سرویس کامل و کاربردی
- دریافت لیست کانفیگ ها و دریافت بارکد هر کانفیگ
- شخصی سازی کامل برنامه ها

# مراحل نصب
1. دانلود فایل template
```sh
sudo wget -N -P /var/lib/marzban/templates/subscription/ https://github.com/MatinDehghanian/sub-vite/releases/download/v.1.0/marzneshin-index.html

2. دستورات زیر رو تو ترمینال سرورتون بزنید:
```sh
echo 'CUSTOM_TEMPLATES_DIRECTORY="/var/lib/marzneshin/templates/"' | sudo tee -a /etc/opt/marzneshin/.env
echo 'SUBSCRIPTION_PAGE_TEMPLATE="subscription/marzneshin-index.html"' | sudo tee -a /etc/opt/marzneshin/.env
```
یا مقادیر زیر رو در فایل `.env` در پوشه `/etc/opt/marzneshin` با پاک کردن # اول آنها از حالت کامنت در بیارید.
```sh
CUSTOM_TEMPLATES_DIRECTORY="/var/lib/marzneshin/templates/"
SUBSCRIPTION_PAGE_TEMPLATE="subscription/marzneshin-index.html"
```

3. ری استارت مرزنشین
```sh
marzneshin restart
```


## بروزرسانی
برای بروزرسانی تمپلیت فقط کافیست مرحله 1 را تکرار کنید.

# شخصی سازی
ریپازیتوری 
https://github.com/MatinDehghanian/public-assets/blob/main/json/apps.json
رو باز کنید
در صورت نیاز فورک کنید و میتونید اپلیکیشن هارو باتوجه به سیستم عامل اضافه کنید و ایکون های خودتون رو بدید بهش یا لینک برنامه هارو بروزرسانی کنید
آموزش ویدیویی :


[![Youtube Tutorial Video](https://img.youtube.com/vi/l5Pvy6Hof9o/0.jpg)](https://www.youtube.com/watch?v=l5Pvy6Hof9o)





## حمایت و سفارش
برای سفارش تمپلیت اختصاصی خودتون توی <a href="https://t.me/Mqtin">تلگرام</a> با من در ارتباط باشین.

<a href="https://nowpayments.io/donation?api_key=Z50AKDD-DHSMN86-P0DQ22X-1SQAFCA" target="_blank" rel="noreferrer noopener">
    <img src="https://nowpayments.io/images/embeds/donation-button-black.svg" alt="Crypto donation button by NOWPayments">
</a>
