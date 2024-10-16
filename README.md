
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
sudo wget -N -P /var/lib/marzban/templates/subscription/ https://github.com/MatinDehghanian/sub-vite/releases/download/v.1.0/marzban-index.html

2. دستورات زیر رو تو ترمینال سرورتون بزنید:
```sh
echo 'CUSTOM_TEMPLATES_DIRECTORY="/var/lib/marzban/templates/"' | sudo tee -a /opt/marzban/.env
echo 'SUBSCRIPTION_PAGE_TEMPLATE="subscription/marzban-index.html"' | sudo tee -a /opt/marzban/.env
```
یا مقادیر زیر رو در فایل `.env` در پوشه `/opt/marzban` با پاک کردن # اول آنها از حالت کامنت در بیارید.
```sh
CUSTOM_TEMPLATES_DIRECTORY="/var/lib/marzban/templates/"
SUBSCRIPTION_PAGE_TEMPLATE="subscription/marzban-index.html"
```

3. ری استارت مرزبان
```sh
marzban restart
```


# مراحل نصب در هاست:

ابتدا دو فایل [.htaccess](https://github.com/MatinDehghanian/sub-vite/blob/assets/build/host/sub/.htaccess) و [index.php](https://github.com/MatinDehghanian/sub-vite/blob/assets/build/host/sub/index.php) رو از build/sub دانلود کنید.

در پوشه public_html هاستتون یک فولد به اسم sub بسازید و فایل‌های مربوطه رو در اون قسمت آپلود کنید.

پس از آپلود فایل [index.php](https://github.com/MatinDehghanian/sub-vite/blob/main/build/sub/index.php) رو ویرایش کنید و آدرس پنل خودتون رو داخلش قرار بدید (به همراه پورت).


## بروزرسانی
برای بروزرسانی تمپلیت فقط کافیست مرحله 1 را تکرار کنید.

# شخصی سازی
ریپازیتوری 
https://github.com/MatinDehghanian/public-assets/blob/main/json/apps.json
رو باز کنید
در صورت نیاز فورک کنید و میتونید اپلیکیشن هارو باتوجه به سیستم عامل اضافه کنید و ایکون های خودتون رو بدید بهش یا لینک برنامه هارو بروزرسانی کنید

## حمایت و سفارش
برای سفارش تمپلیت اختصاصی خودتون توی <a href="https://t.me/Mqtin">تلگرام</a> با من در ارتباط باشین.
