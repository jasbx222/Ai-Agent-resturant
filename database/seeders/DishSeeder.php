<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Dish;
use App\Models\DishAllergen;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DishSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'المقبّلات' => [
                ['name' => 'سلطة الشمندر مع جبن الماعز', 'desc' => 'شمندر مشوي، جبن الماعز الكريمي، جوز مكرمل، مع صلصة البلسميك الفاخرة.', 'price' => 55, 'vegan' => false, 'spicy' => false, 'featured' => true, 'allergens' => ['ألبان', 'مكسرات']],
                ['name' => 'شوربة الفطر البري', 'desc' => 'مزيج من الفطر البري الطازج مع كريمة الطبخ وزيت الترافل الأبيض.', 'price' => 45, 'vegan' => false, 'spicy' => false, 'featured' => false, 'allergens' => ['ألبان']],
                ['name' => 'كنافة الروبيان', 'desc' => 'روبيان مغلف بخيوط الكنافة المقرمشة، يقدم مع صوص الفلفل الحلو.', 'price' => 75, 'vegan' => false, 'spicy' => true, 'featured' => true, 'allergens' => ['قشريات', 'جلوتين']],
                ['name' => 'تاكو اللحم المدخن', 'desc' => 'خبز التاكو المحضر يدوياً مع لحم بريسكيت مدخن وصوص الأفوكادو.', 'price' => 65, 'vegan' => false, 'spicy' => true, 'featured' => false, 'allergens' => ['جلوتين']],
                ['name' => 'سلطة الكينوا والحمضيات', 'desc' => 'كينوا عضوية مع قطع البرتقال والجريب فروت، بذور الرمان، وصلصة الليمون.', 'price' => 50, 'vegan' => true, 'spicy' => false, 'featured' => false, 'allergens' => []],
            ],
            'المعكرونة' => [
                ['name' => 'بينيه أرابيتا', 'desc' => 'معكرونة بينيه مع صوص الطماطم الإيطالي الحار، ثوم، وزيت زيتون بكر.', 'price' => 70, 'vegan' => true, 'spicy' => true, 'featured' => false, 'allergens' => ['جلوتين']],
                ['name' => 'لازانيا اللحم التقليدية', 'desc' => 'طبقات من العجين الطازج، صوص البولونيز المنزلي، وبشاميل كريمي.', 'price' => 85, 'vegan' => false, 'spicy' => false, 'featured' => true, 'allergens' => ['جلوتين', 'ألبان']],
                ['name' => 'فيتوتشيني ألفريدو', 'desc' => 'شرائح الفيتوتشيني مع صوص الكريمة الغني، فطر طازج وجودة بارميزان.', 'price' => 80, 'vegan' => false, 'spicy' => false, 'featured' => false, 'allergens' => ['جلوتين', 'ألبان']],
                ['name' => 'سباغيتي ثمار البحر', 'desc' => 'سباغيتي مع تشكيلة من ثمار البحر الطازجة، ثوم، بقدونس وصلصة طماطم خفيفة.', 'price' => 95, 'vegan' => false, 'spicy' => false, 'featured' => true, 'allergens' => ['جلوتين', 'قشريات']],
                ['name' => 'رافيلو السبانخ والريكوتا', 'desc' => 'حبات الرافيلو المحشوة يدويًا مع صوص الزبدة والميرمية.', 'price' => 90, 'vegan' => false, 'spicy' => false, 'featured' => false, 'allergens' => ['جلوتين', 'ألبان']],
            ],
            'الأطباق الرئيسية' => [
                ['name' => 'أضلاع الغنم المشوية', 'desc' => 'ريش غنم متبلة بالأعشاب البرية، تقدم مع هريس البطاطس وصوص التوت البري.', 'price' => 185, 'vegan' => false, 'spicy' => false, 'featured' => true, 'allergens' => []],
                ['name' => 'ستيك واغيو الفاخر', 'desc' => 'شريحة لحم واغيو عالية الجودة، مشوية لدرجة الكمال، تقدم مع خضروات مشوية.', 'price' => 380, 'vegan' => false, 'spicy' => false, 'featured' => true, 'allergens' => []],
                ['name' => 'دجاج محمر بالأعشاب', 'desc' => 'نصف دجاجة متبلة بالروز ماري والليمون، تقدم مع أرز بالزعفران.', 'price' => 110, 'vegan' => false, 'spicy' => false, 'featured' => false, 'allergens' => []],
                ['name' => 'كتف الغنم المستوي (للمشاركة)', 'desc' => 'كتف غنم مطهو ببطء لمدة ١٢ ساعة، يقدم مع أرز شرقي مكسرات.', 'price' => 320, 'vegan' => false, 'spicy' => false, 'featured' => true, 'allergens' => ['مكسرات']],
                ['name' => 'موزات لحم بالفرن', 'desc' => 'موزات لحم غنم تذوب في الفم مع صوص المرق البني وخضروات جذرية.', 'price' => 140, 'vegan' => false, 'spicy' => false, 'featured' => false, 'allergens' => []],
            ],
            'المأكولات البحرية' => [
                ['name' => 'سلمون مشوي بالزبدة', 'desc' => 'شريحة سلمون نرويجي مشوية، تقدم مع هليون وصوص الليمون والزبدة.', 'price' => 135, 'vegan' => false, 'spicy' => false, 'featured' => true, 'allergens' => ['أسماك', 'ألبان']],
                ['name' => 'هامور مقلي بالخلطة السرية', 'desc' => 'قطع هامور طازجة مقلية، تقدم مع بطاطس مقلية وصوص الطرطور.', 'price' => 120, 'vegan' => false, 'spicy' => false, 'featured' => false, 'allergens' => ['أسماك', 'جلوتين']],
                ['name' => 'لوبستر مشوي بالجبن', 'desc' => 'ذيل لوبستر جامبو مشوي مع خلطة الأجبان الثلاثة والأعشاب.', 'price' => 280, 'vegan' => false, 'spicy' => false, 'featured' => true, 'allergens' => ['قشريات', 'ألبان']],
                ['name' => 'صيادية مائدة الشيف', 'desc' => 'أرز الصيادية البني مع قطع السمك المقلي والبصل المكرمل والمكسرات.', 'price' => 110, 'vegan' => false, 'spicy' => false, 'featured' => false, 'allergens' => ['أسماك', 'مكسرات']],
                ['name' => 'جمبري جامبو مشوي', 'desc' => 'جمبري مشوي على الفحم متبل بالثوم والليمون والكزبرة.', 'price' => 160, 'vegan' => false, 'spicy' => true, 'featured' => false, 'allergens' => ['قشريات']],
            ],
            'الحلويات' => [
                ['name' => 'تيراميسو مائدة الشيف', 'desc' => 'طبقات من البسكويت المشرب بالقهوة المختصة مع كريمة المسكربون الغنية.', 'price' => 65, 'vegan' => false, 'spicy' => false, 'featured' => true, 'allergens' => ['جلوتين', 'ألبان']],
                ['name' => 'فوندان الشوكولاتة الذائبة', 'desc' => 'كيك شوكولاتة ساخن مع قلب ذائب، يقدم مع آيس كريم فانيليا.', 'price' => 58, 'vegan' => false, 'spicy' => false, 'featured' => false, 'allergens' => ['جلوتين', 'ألبان']],
                ['name' => 'تشيز كيك التمر', 'desc' => 'مزيج مبتكر من التمر الفاخر والجبن الكريمي على قاعدة من البسكويت.', 'price' => 55, 'vegan' => false, 'spicy' => false, 'featured' => true, 'allergens' => ['جلوتين', 'ألبان']],
                ['name' => 'أم علي بالفستق الحلبي', 'desc' => 'حلوى شرقية دافئة بالحليب وكريمة الخفق والمكسرات المحمصة.', 'price' => 50, 'vegan' => false, 'spicy' => false, 'featured' => false, 'allergens' => ['جلوتين', 'ألبان', 'مكسرات']],
                ['name' => 'سلطة فواكه استوائية', 'desc' => 'تشكيلة من الفواكه الموسمية والفريدة مع صوص النعناع والليمون.', 'price' => 45, 'vegan' => true, 'spicy' => false, 'featured' => false, 'allergens' => []],
            ],
            'المشروبات' => [
                ['name' => 'موهيتو الفراولة والنعناع', 'desc' => 'مزيج منعش من الفراولة الطازجة والنعناع والليمون والصودا.', 'price' => 35, 'vegan' => true, 'spicy' => false, 'featured' => true, 'allergens' => []],
                ['name' => 'عصير رمان طبيعي', 'desc' => 'عصير رمان طازج معصور على البارد بدون سكر مضاف.', 'price' => 30, 'vegan' => true, 'spicy' => false, 'featured' => false, 'allergens' => []],
                ['name' => 'قهوة عربية (دلة)', 'desc' => 'قهوة عربية أصيلة معدّة بالهيل والزعفران، تقدم مع التمر.', 'price' => 45, 'vegan' => true, 'spicy' => false, 'featured' => true, 'allergens' => []],
                ['name' => 'شاي مغربي ملكي', 'desc' => 'شاي أخضر بالنعناع المغربي الطازج يقدّم بالطريقة التقليدية.', 'price' => 25, 'vegan' => true, 'spicy' => false, 'featured' => false, 'allergens' => []],
                ['name' => 'سبيشاليتي كابتشينو', 'desc' => 'قهوة مختصة مع رغوة حليب كريمية ورسم احترافي.', 'price' => 28, 'vegan' => false, 'spicy' => false, 'featured' => false, 'allergens' => ['ألبان']],
            ],
        ];

        foreach ($categories as $catName => $dishList) {
            $category = Category::where('name', $catName)->first();
            if (!$category) continue;

            foreach ($dishList as $item) {
                $dish = Dish::updateOrCreate(
                    ['name' => $item['name']],
                    [
                        'category_id' => $category->id,
                        'slug' => Str::slug($item['name'], '-', 'ar'),
                        'description' => $item['desc'],
                        'price' => $item['price'],
                        'is_vegan' => $item['vegan'],
                        'is_spicy' => $item['spicy'],
                        'is_featured' => $item['featured'],
                        'is_available' => true,
                    ]
                );

                // Add allergens
                foreach ($item['allergens'] as $allergenName) {
                    DishAllergen::updateOrCreate([
                        'dish_id' => $dish->id,
                        'allergen_name' => $allergenName,
                    ]);
                }
            }
        }
    }
}
