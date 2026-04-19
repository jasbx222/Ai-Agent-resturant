<x-mail::message>
# سيد/سيدة {{ $reservation->name }} المحترم/ة

يؤسفنا إبلاغكم بأنه قد تم إلغاء حجزكم في **مائدة الشيف**.

**تفاصيل الحجز الملغى:**
- **التاريخ:** {{ $reservation->date }}
- **الوقت:** {{ $reservation->time_slot }}
- **عدد الأشخاص:** {{ $reservation->party_size }}

@if($reservation->cancellation_reason)
**سبب الإلغاء:**
{{ $reservation->cancellation_reason }}
@endif

في حال كان لديكم أي استفسار، يرجى التواصل معنا عبر الهاتف أو البريد الإلكتروني.

نتمنى رؤيتكم في مناسبة أخرى قريباً.

مع أطيب التحيات،<br>
إدارة **مائدة الشيف**
</x-mail::message>
