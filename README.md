
## Desktop
<img src="https://raw.githubusercontent.com/MatinDehghanian/sub-vite/main/images/desktop.png" title="Marzneshin-Sub-Desktop"/>

## Responsive Mobile
<img src="https://raw.githubusercontent.com/MatinDehghanian/sub-vite/main/images/web-Mobile.JPEG" title="Marzneshin-Sub-Mobile"/>

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
sudo wget -N -P /var/lib/marzban/templates/subscription/  https://raw.githubusercontent.com/MatinDehghanian/sub-vite/refs/heads/main/build/index.html
```

2. دستورات زیر رو تو ترمینال سرورتون بزنید:
```sh
echo 'CUSTOM_TEMPLATES_DIRECTORY="/var/lib/marzban/templates/"' | sudo tee -a /opt/marzban/.env
echo 'SUBSCRIPTION_PAGE_TEMPLATE="subscription/index.html"' | sudo tee -a /opt/marzban/.env
```
یا مقادیر زیر رو در فایل `.env` در پوشه `/opt/marzban` با پاک کردن # اول آنها از حالت کامنت در بیارید.
```sh
CUSTOM_TEMPLATES_DIRECTORY="/var/lib/marzban/templates/"
SUBSCRIPTION_PAGE_TEMPLATE="subscription/index.html"
```

3. ری استارت مرزبان
```sh
marzban restart
```


# مراحل نصب در هاست : 

ابتدا دو فایل .htaccess و index.php رو از build/sub دانلود کنید

و در پوشه public_html هاستتون یک فولد به اسم sub بسازید و فایل های مربوطه رو در اون قسمت اپلود کنید. 

پس از آپلود فایل index.php رو ویرایش کنید و آدرس پنل خودتون رو داخلش قرار بدید ( به همراه پورت ) 

## بروزرسانی
برای بروزرسانی تمپلیت فقط کافیست مرحله 1 را تکرار کنید.

# شخصی سازی
ریپازیتوری 
https://github.com/MatinDehghanian/public-assets/blob/main/json/apps.json
رو باز کنید
در صورت نیاز فورک کنید و میتونید اپلیکیشن هارو باتوجه به سیستم عامل اضافه کنید و ایکون های خودتون رو بدید بهش یا لینک برنامه هارو بروزرسانی کنید

## حمایت و سفارش
برای سفارش تمپلیت اختصاصی خودتون توی <a href="https://t.me/Mqtin">تلگرام</a> با من در ارتباط باشین.
