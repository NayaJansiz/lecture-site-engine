# المحاضرة 12 — Game Programming (برمجة الألعاب باستخدام Pygame)

> **المادة:** البرمجة المتقدمة 2 (القسم النظري) | **الموضوع:** مكتبة `Pygame` لتطوير الألعاب ثنائية الأبعاد بلغة `Python`

---

## 📌 خريطة التكامل (أين تقع هذه المحاضرة في الدورة؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| أساسيات Python | `variables`، `loops`، `functions`، `OOP` | كود منظّم قابل للتوسع |
| البرمجة الكائنية | `class`، `inheritance`، `super()` | كائنات `Sprite` تمثّل عناصر اللعبة |
| **برمجة الألعاب ← أنت هنا** | `pygame`، `Surface`، `Rect`، `Sprite`، `event loop` | لعبة `2D` كاملة تعمل على الشاشة |
| مرحلة متقدمة | `Panda3D`، `3D engines` | ألعاب ثلاثية الأبعاد |

> **نوع هذه المحاضرة:** Game Development — كود عملي + مفاهيم نظرية + مخططات تدفق

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. مكتبة `Pygame` — لماذا Python للألعاب؟

#### النص الأصلي يقول:
> Python is the most popular programming language or nothing wrong to say that it is the next-generation programming language. In every emerging field in computer science, Python makes its presence actively. Python has vast libraries for various fields such as Machine Learning (Numpy, Pandas, Matplotlib), Artificial intelligence (Pytorch, TensorFlow), and Game development (Pygame, Pyglet). In this tutorial, we are going to learn about game development using the Pygame (Python library).

#### الشرح المبسّط:
`Python` ليست لغة للبرمجة العلمية فقط — إنها موجودة في كل مجال. عندما تريد تطوير لعبة بسرعة دون الغوص في تعقيدات `C++`، فإن `Pygame` تمنحك الأدوات الجاهزة: رسم، صوت، أحداث.

**لماذا؟** لأن `Python` لها `ecosystem` ضخم من المكتبات الجاهزة، مما يجعل الوصول من الفكرة إلى النتيجة أسرع بكثير من الصفر.

💡 **التشبيه:**
> مثل مطبخ مجهّز بالكامل — لا تحتاج أن تصنع أدواتك؛ `Pygame` هي طاقم الأواني الجاهز.
> **وجه الشبه:** مكتبة `Pygame` = أواني الطبخ الجاهزة، المبرمج = الطاهي.

| المجال | المكتبات الرئيسية |
| --- | --- |
| Machine Learning | `Numpy`، `Pandas`، `Matplotlib` |
| Artificial Intelligence | `Pytorch`، `TensorFlow` |
| Game Development | `Pygame`، `Pyglet` |
| Advanced 3D Games | `Panda3D` |

#### ملاحظة:
> `Panda3D` مخصص لمن يريد الانتقال للمستوى التالي — الألعاب ثلاثية الأبعاد.

---

### 2. ما هو `Pygame`؟

#### النص الأصلي يقول:
> Pygame is a cross-platform set of Python modules which is used to create video games. It consists of computer graphics and sound libraries designed to be used with the Python programming language. Pygame was officially written by Pete Shinners to replace PySDL. Pygame is suitable to create client-side applications that can be potentially wrapped in a standalone executable.

#### الشرح المبسّط:
`Pygame` هي مجموعة `modules` في `Python` تعمل على كل أنظمة التشغيل. تدمج بين رسم الجرافيك والصوت في مكان واحد. كُتبت رسمياً من قِبَل **Pete Shinners** لتحلّ محلّ `PySDL`. يمكن تحويل برنامجك إلى ملف تنفيذي مستقل يعمل بدون تثبيت `Python`.

**لماذا؟** لأنها تخفي تعقيدات `SDL` (Simple DirectMedia Layer) خلف واجهة `Python` بسيطة.

💡 **التشبيه:**
> `Pygame` مثل تطبيق كاميرا الهاتف — كل التعقيد (معالجة الصورة، التركيز) مختفٍ خلف زر واحد.
> **وجه الشبه:** الزر = دوال `Pygame`، معالجة الصورة = كود `C` المخفي.

| الخاصية | التفصيل |
| --- | --- |
| النوع | `cross-platform Python modules` |
| الغرض | إنشاء ألعاب فيديو |
| المؤلف | `Pete Shinners` |
| يحلّ محلّ | `PySDL` |
| المخرجات | تطبيقات `client-side` أو `standalone executable` |

---

### 3. أول برنامج `Pygame` — النافذة الفارغة

#### النص الأصلي يقول:
> الكود P_1.py يُظهر نافذة `pygame window` فارغة سوداء.

#### الشرح المبسّط:
هذا هو الهيكل الأساسي لأي لعبة — لا محتوى بعد، فقط نافذة تنتظر أحداثاً.

#### 💻 الكود: P_1.py — النافذة الأساسية

#### ما هذا الكود؟
> يُنشئ نافذة `Pygame` فارغة وينتظر حتى يضغط المستخدم على زر الإغلاق.

```python
import pygame  # Import the pygame library

pygame.init()  # Initialize all pygame modules
screen = pygame.display.set_mode((400, 500))  # Create a 400x500 window
done = False  # Game loop control flag

while not done:  # Main game loop — keeps running until done=True
    for event in pygame.event.get():  # Process all pending events
        if event.type == pygame.QUIT:  # Check if user clicked close button
            done = True  # Set flag to exit the loop

    pygame.display.flip()  # Update the display (swap buffers)

pygame.quit()  # Clean up pygame resources
```

#### شرح كل سطر:
1. `import pygame` → تستورد مكتبة `pygame` كاملة — بوابة الدخول لكل ما يلي.
2. `pygame.init()` → تهيّئ جميع `modules` الداخلية لـ`pygame` (صوت، شاشة، أحداث) — يجب أن تكون **أول سطر** بعد الاستيراد.
3. `pygame.display.set_mode((400, 500))` → تُنشئ نافذة بعرض 400 وارتفاع 500 بكسل وتُرجع `Surface` يمثّل الشاشة.
4. `done = False` → متغيّر تحكم حلقة اللعبة — عندما يصبح `True` تنتهي اللعبة.
5. `while not done:` → حلقة اللعبة الرئيسية — تُنفَّذ عشرات المرات في الثانية.
6. `for event in pygame.event.get():` → تفرّغ قائمة الأحداث المعلّقة — بدونها تتجمّد النافذة.
7. `if event.type == pygame.QUIT:` → يكشف الضغط على زر الإغلاق `X`.
8. `done = True` → يأمر الحلقة بالخروج في الدورة القادمة.
9. `pygame.display.flip()` → `pygame` ذو `double buffering` — هذا السطر يعرض الإطار المرسوم على الشاشة الحقيقية.
10. `pygame.quit()` → يحرّر الذاكرة والموارد التي استخدمتها `pygame`.

**المكتبات المطلوبة (Imports):**
> `import pygame`

**الناتج المتوقع (لقطة الشاشة):**
> نافذة سوداء فارغة بعنوان "pygame window" — تنتظر حتى تضغط X لتُغلق.

#### مهم للامتحان ⚠️:
> `pygame.event.get()` ليس اختيارياً — إذا لم تستدعِه ستتجمّد النافذة لأن نظام التشغيل سيعتقد أن البرنامج معطّل.

#### 🖼️ وصف الشاشة: P_1.py

> **الصفحة/الشريحة:** 4
> **ملاحظة:** لا يمكن عرض لقطة الشاشة في الموقع — الوصف التالي يغطي كل عنصر.

| العنصر | الموقع | الوظيفة |
| --- | --- | --- |
| شريط العنوان | أعلى النافذة | يُظهر "pygame window" |
| منطقة الرسم | كل النافذة | سوداء (الخلفية الافتراضية) |
| أيقونة `pygame` | يسار شريط العنوان | شعار المكتبة |

---

### 3.1. نسخة بديلة — P_1_0.py

#### النص الأصلي يقول:
> كود P_1_0.py يختلف عن P_1.py في أن `pygame.quit()` داخل الحلقة عند QUIT، لا خارجها.

#### الشرح المبسّط:
هناك طريقتان لإغلاق `pygame`:

#### 🔄 قبل / بعد: موضع `pygame.quit()`

**قبل (P_1.py):**
```python
while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True   # Exit loop first

pygame.quit()  # Then clean up after loop ends
```

**بعد (P_1_0.py):**
```python
while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()  # Clean up immediately
            done = True
    pygame.display.flip()
```

**ماذا تغيّر؟** `pygame.quit()` انتقل إلى داخل الحدث مباشرةً — كلاهما يعمل، لكن الأولى أكثر نظافة.

---

### 4. مفهوم `Game Loop` — دورة اللعبة

#### النص الأصلي يقول:
> مخطط Game Loop: Handle Events → Update Game State → Draw Screen → تكرار

#### الشرح المبسّط:
كل لعبة تعمل كدوّامة دائمة من ثلاث خطوات: استقبال المدخلات، تحديث الحالة، رسم الشاشة.

💡 **التشبيه:**
> مثل مؤشر ساعة الكوارتز — يتحرك كل ثانية بنفس الخطوات الثلاث (تحقق من البطارية، حرّك المؤشر، اعرض الوقت).
> **وجه الشبه:** ثانية واحدة = إطار واحد (Frame).

#### 📊 المخطط: دورة اللعبة (Game Loop)

#### ما هذا المخطط؟
> يوضّح الدورة الحتمية التي تتكرر في كل إطار من إطارات اللعبة.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Handle Events | process | معالجة ضغطات لوحة المفاتيح والفأرة وإغلاق النافذة |
| 2 | Update Game State | process | تحريك الكائنات، حساب التصادمات، تحديث النقاط |
| 3 | Draw Screen | process | رسم الخلفية والكائنات على السطح ثم `flip()` |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Handle Events | Update Game State | ينتقل إلى | → | بعد معالجة الأحداث تُحدَّث الحالة |
| Update Game State | Draw Screen | ينتقل إلى | → | بعد التحديث ترسم الشاشة |
| Draw Screen | Handle Events | تكرار | → | تعود للبداية في كل إطار |

```diagram
type: flowchart
title: Game Loop
direction: TD
nodes:
  - id: events
    label: Handle Events
    kind: process
    level: 0
  - id: update
    label: Update Game State
    kind: process
    level: 1
  - id: draw
    label: Draw Screen
    kind: process
    level: 2
edges:
  - from: events
    to: update
    label: ""
  - from: update
    to: draw
    label: ""
  - from: draw
    to: events
    label: repeat
```

#### ⚙️ الخطوات / الخوارزمية: Game Loop

> هدفها: إبقاء اللعبة تستجيب وتُرسَم بشكل مستمر.

```algorithm
1 | Handle Events    | pygame.event.get()     | تفريغ قائمة الأحداث ومعالجة كل منها
2 | Update State     | logic code             | تحريك الكائنات وحساب النقاط والتصادمات
3 | Draw Screen      | screen.blit() + shapes | مسح الشاشة ورسم كل شيء من جديد
4 | Flip Display     | pygame.display.flip()  | نقل الإطار المرسوم للشاشة الحقيقية
5 | Control FPS      | clock.tick(FPS)        | تقييد سرعة الحلقة لمنع الإفراط
6 | Repeat           | while not done         | العودة للخطوة 1 في الإطار التالي
```

#### نقاط التنفيذ:
- الخطوة 3 يجب أن تبدأ دائماً بمسح الشاشة (`screen.fill()`) قبل الرسم، وإلا ستتراكم الصور.
- `flip()` يجب أن يكون **آخر** ما يُستدعى في كل إطار.

---

### 5. `Pygame Surface` — سطح الرسم

#### النص الأصلي يقول:
> The pygame Surface is used to display any image. The Surface color is by default black. Its size is defined by passing the size argument. Surfaces can have the number of extra attributes like alpha planes, color keys, source rectangle clipping, etc. The Surface defines a rectangular area on which you can draw. In pygame, everything is viewed on a single user-created display, which can be a window or a full screen. The display is created using .set_mode(), which returns a Surface representing the visible part of the window. It is this Surface that you pass into drawing functions like pygame.draw.circle(), and the contents of that Surface are pushed to the display when you call pygame.display.flip().

#### الشرح المبسّط:
`Surface` هو لوح الرسم في `pygame` — أي مستطيل يمكن رسم الأشكال والصور عليه. الشاشة الرئيسية نفسها `Surface`، والصور المحمّلة كلها `Surface`.

**لماذا؟** لأن الفصل بين "اللوح الذي ترسم عليه" و"الشاشة الحقيقية" يُتيح `double buffering` ويمنع الوميض (flickering).

💡 **التشبيه:**
> `Surface` مثل ورقة رسم شفافة توضع فوق الشاشة — ترسم على الورقة ثم تعرضها دفعة واحدة.
> **وجه الشبه:** ورقة الرسم = `Surface`، لحظة عرضها = `pygame.display.flip()`.

| الخاصية | القيمة الافتراضية | التغيير |
| --- | --- | --- |
| اللون | أسود | `surface.fill((R, G, B))` |
| الحجم | يُحدَّد عند الإنشاء | تمرير `(width, height)` |
| الخصائص الإضافية | لا شيء | `alpha planes`، `color keys`، `clipping` |

#### نقطة مهمة ⚠️:
> كل شيء في `pygame` يُرسم على `Surface` — بما في ذلك الصور والنصوص والأشكال. الشاشة الرئيسية هي `Surface` خاص يُنشأ بـ`pygame.display.set_mode()`.

---

### 6. الصور والـ`Rect` — Images and Rects

#### النص الأصلي يقول:
> Your basic pygame program drew a shape directly onto the display's Surface, but you can also work with images on the disk. The image module allows you to load and save images in a variety of popular formats. Images are loaded into Surface objects. As mentioned above, Surface objects are represented by rectangles, as are many other objects in pygame, such as images and windows. Rectangles are so heavily used that there is a special Rect class just to handle them.

#### الشرح المبسّط:
الصور المحمّلة من القرص تتحوّل إلى كائنات `Surface`. كل `Surface` له شكل مستطيل (`Rect`) يحدد موضعه وأبعاده. `Rect` مُستخدم في كل مكان في `pygame` لذا له `class` خاص.

**لماذا `Rect`؟** لأن اكتشاف التصادم بين المستطيلات سريع جداً رياضياً، وكل شيء في الشاشة مستطيل في النهاية.

💡 **التشبيه:**
> كل كائن في اللعبة مثل بطاقة هوية — الصورة هي وجهك والـ`Rect` هو الإطار المستطيل للبطاقة الذي يحدد موضعك.
> **وجه الشبه:** إطار البطاقة = `Rect`، وجهك = `Surface`.

#### 💻 الكود: P_2.py — تحميل وعرض صورة

#### ما هذا الكود؟
> يحمّل صورة من القرص ويعرضها على شاشة بيضاء.

```python
import pygame  # Import pygame library

pygame.init()  # Initialize pygame
white = (255, 255, 255)  # Define white color as RGB tuple
height = 400  # Window height
width = 400   # Window width
display_surface = pygame.display.set_mode((height, width))  # Create display
pygame.display.set_caption('Image')  # Set window title
image = pygame.image.load('images/bio.png')  # Load image from disk into Surface
done = False  # Game loop flag

while not done:
    display_surface.fill(white)  # Clear screen with white background
    display_surface.blit(image, (0, 0))  # Draw image at top-left corner (0,0)
    for event in pygame.event.get():  # Handle events
        if event.type == pygame.QUIT:
            done = True  # Exit on close button

    pygame.display.update()  # Update display

pygame.quit()  # Clean up
```

#### شرح كل سطر:
1. `white = (255, 255, 255)` → لون أبيض كـ`RGB tuple` — كل قيمة بين 0-255.
2. `pygame.display.set_mode((height, width))` → إنشاء نافذة 400×400 وإرجاع `Surface`.
3. `pygame.display.set_caption('Image')` → يضع نصاً في شريط عنوان النافذة.
4. `pygame.image.load('images/bio.png')` → يحمّل صورة `PNG` من مجلد `images` ويحوّلها إلى `Surface`.
5. `display_surface.fill(white)` → يمسح الشاشة بالأبيض في بداية كل إطار (مهم لمنع تراكم الصور).
6. `display_surface.blit(image, (0, 0))` → يرسم الصورة على السطح الرئيسي عند الإحداثيات (0,0).
7. `pygame.display.update()` → مكافئ لـ`flip()` — يُحدّث الشاشة.

**المكتبات المطلوبة (Imports):**
> `import pygame`

**الناتج المتوقع (لقطة الشاشة):**
> نافذة بيضاء بعنوان "Image" تعرض صورة حشرة (ladybug) في الزاوية العليا اليسرى.

#### ملاحظة:
> `blit` = **Bl**ock **It**ransfer — نقل كتلة بكسل من `Surface` لآخر. هو الطريقة الوحيدة لرسم صورة على صورة في `pygame`.

---

### 7. حركة الصورة تلقائياً — P_2_0.py (Animation)

#### النص الأصلي يقول:
> كود P_2_0.py يحرّك صورة بشكل مستطيل: يمين → أسفل → يسار → أعلى → يمين ...

#### الشرح المبسّط:
بتغيير `catx` و`caty` في كل إطار وإعادة رسم الصورة، تنشأ حركة انسيابية.

#### 💻 الكود: P_2_0.py — تحريك صورة (Animation)

#### ما هذا الكود؟
> يحرّك صورة في مسار مستطيل على الشاشة باستخدام `direction` variable.

```python
import pygame, sys  # Import pygame and sys
from pygame.locals import *  # Import pygame constants directly (QUIT, etc.)

pygame.init()  # Initialize pygame
FPS = 30  # Frames Per Second limit
fpsClock = pygame.time.Clock()  # Create clock object to control FPS
DISPLAYSURF = pygame.display.set_mode((400, 300), 0, 32)  # 400x300 window, 32-bit color
pygame.display.set_caption('Animation')  # Window title
WHITE = (255, 255, 255)  # White color
catImg = pygame.image.load('images/bio.gif')  # Load the moving image
catx = 10  # Initial x position
caty = 10  # Initial y position
direction = 'right'  # Initial movement direction

while True:  # Infinite loop
    DISPLAYSURF.fill(WHITE)  # Clear screen
    if direction == 'right':  # Moving right
        catx += 5  # Increase x
        if catx == 280:  # Hit right boundary
            direction = 'down'  # Change to downward
    elif direction == 'down':  # Moving down
        caty += 5  # Increase y
        if caty == 220:  # Hit bottom boundary
            direction = 'left'
    elif direction == 'left':  # Moving left
        catx -= 5  # Decrease x
        if catx == 10:  # Hit left boundary
            direction = 'up'
    elif direction == 'up':  # Moving up
        caty -= 5  # Decrease y
        if caty == 10:  # Hit top boundary
            direction = 'right'  # Complete one cycle

    DISPLAYSURF.blit(catImg, (catx, caty))  # Draw image at current position

    for event in pygame.event.get():  # Handle events
        if event.type == QUIT:  # Close button
            pygame.quit()
            sys.exit()  # Exit program

    pygame.display.update()  # Update display
    fpsClock.tick(FPS)  # Wait to maintain 30 FPS
```

#### شرح كل سطر:
1. `from pygame.locals import *` → يستورد ثوابت `pygame` مباشرةً (مثل `QUIT`) بدل كتابة `pygame.QUIT`.
2. `fpsClock = pygame.time.Clock()` → كائن ساعة للتحكم في سرعة الحلقة.
3. `direction = 'right'` → متغيّر نصي يحدد اتجاه الحركة الحالي.
4. `catx += 5` → تحريك 5 بكسل يمين في كل إطار — `30 FPS × 5 = 150 pixel/sec`.
5. `if catx == 280:` → الحدّ الأيمن للحركة (400 عرض الشاشة − 120 هامش تقريبي).
6. `DISPLAYSURF.blit(catImg, (catx, caty))` → رسم الصورة في الموضع الجديد بعد حسابه.
7. `fpsClock.tick(FPS)` → يُوقف الحلقة لفترة كافية ليكون هناك 30 إطار/ثانية بالضبط.

**المكتبات المطلوبة (Imports):**
> `import pygame, sys` | `from pygame.locals import *`

**الناتج المتوقع (لقطة الشاشة):**
> الصورة تتحرك في مسار مستطيل: يمين ثم أسفل ثم يسار ثم أعلى وتكرر.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا نضع `DISPLAYSURF.fill(WHITE)` في **بداية** الحلقة وليس في نهايتها؟
> **لماذا هذا مهم؟** لأن بدونه ستبقى كل الأطر السابقة مرسومة — ستظهر الصورة كأنها تترك أثراً خلفها بدلاً من أن تتحرك بشكل نظيف.

---

### 8. `Pygame Rect` — كائن المستطيل

#### النص الأصلي يقول:
> Rect is used to draw a rectangle in Pygame. Pygame uses Rect objects to store and manipulate rectangular areas. A Rect can be formed from a combination of left, top, width, and height values. It can also be created from Python objects that are already a Rect or have an attribute named "rect". The rect() function is used to perform changes in the position or size of a rectangle. It returns the new copy of the Rect with the affected changes. No modification happens in the original rectangle. The dimension of the rectangle can be changed by assigning the size, width, or height. All other assignment moves the rectangle without resizing it. If the width or height is a non-zero value of Rect, then it will return True for a non-zero test. Some methods return a Rect with 0 sizes to represent an invalid rectangle.

#### الشرح المبسّط:
`Rect` هو كائن يمثّل مستطيلاً بإحداثيات وأبعاد. يُستخدم في `pygame` لكل شيء: تحديد مواضع الصور، اكتشاف التصادمات، منطقة الرسم.

**لماذا؟** لأن معظم العمليات الهندسية في الألعاب (تصادم، موضع، حجم) تُجرى على مستطيلات.

💡 **التشبيه:**
> `Rect` مثل إطار صورة بجدار — له موضع (أين على الجدار) وحجم (كم عرضه وطوله).
> **وجه الشبه:** إطار الصورة = `Rect`، الجدار = شاشة `pygame`.

#### السمات الافتراضية لكائن `Rect`:

```text
x, y                         # Top-left corner coordinates
top, left, right, bottom     # Edge positions
topleft, bottomleft, topright, bottomright   # Corner tuples
midtop, midleft, midbottom, midright         # Edge midpoints
center, centerx, centery     # Center point
size, width, height          # Dimensions
w, h                         # Short aliases for width, height
```

#### مهم للامتحان ⚠️:
> `rect()` يُرجع **نسخة جديدة** من `Rect` بعد التعديل — لا يُعدّل المستطيل الأصلي. إذا أردت تعديل الأصل يجب إعادة التعيين: `my_rect = my_rect.move(5, 0)`.

**الفهم الخاطئ ❌:** `rect.move(5, 0)` يُحرّك المستطيل الأصلي.
**الفهم الصحيح ✅:** `rect.move(5, 0)` يُرجع **مستطيل جديد** محرّك — يجب إسناده لمتغير.

#### 💻 الكود: P_3.py — رسم مستطيل بـ`Rect`

#### ما هذا الكود؟
> يرسم مستطيلاً أزرق على شاشة سوداء في موضع محدد.

```python
import pygame  # Import pygame

pygame.init()  # Initialize pygame
screen = pygame.display.set_mode((400, 300))  # Create 400x300 window
done = False  # Loop control

while not done:
    for event in pygame.event.get():  # Handle events
        if event.type == pygame.QUIT:
            done = True

    # Draw filled rectangle: surface, color(RGB), Rect(x, y, width, height)
    pygame.draw.rect(screen, (0, 125, 255), pygame.Rect(30, 30, 60, 60))

    pygame.display.flip()  # Show frame

pygame.quit()  # Cleanup
```

#### شرح كل سطر:
1. `pygame.draw.rect(screen, (0, 125, 255), pygame.Rect(30, 30, 60, 60))` → يرسم مستطيلاً على `screen` باللون `(R=0, G=125, B=255)` بدءاً من `(x=30, y=30)` بعرض 60 وارتفاع 60.

**الناتج المتوقع (لقطة الشاشة):**
> مستطيل أبيض (لون قريب من الأزرق الفاتح) في الزاوية العليا اليسرى على خلفية سوداء.

---

### 9. `Pygame Keydown` — أحداث لوحة المفاتيح

#### النص الأصلي يقول:
> Pygame KEYDOWN and KEYUP detect the event if a key is physically pressed and released. KEYDOWN detects the key press and, KEYUP detects the key release. Both events have two attributes: key (Key is an integer id which represents every key on the keyword) and mod (This is a bitmask of all the modifier keys that were in the pressed state when the event occurred).

#### الشرح المبسّط:
عندما يضغط اللاعب مفتاحاً يُولَّد حدث `KEYDOWN`، وعند إفلاته يُولَّد `KEYUP`. كلاهما يحمل `event.key` (معرّف المفتاح) و`event.mod` (هل كان `Shift`/`Ctrl` مضغوطاً؟).

**لماذا هناك `KEYDOWN` و`KEYUP`؟** لأن بعض الألعاب تحتاج معرفة متى بدأ الضغط (لإطلاق رصاصة مرة واحدة) ومتى انتهى (لإيقاف الحركة).

💡 **التشبيه:**
> `KEYDOWN` = لحظة وطأت قدمك على دواسة البنزين، `KEYUP` = لحظة رفعتها.
> **وجه الشبه:** دواسة البنزين = مفتاح لوحة المفاتيح.

| الحدث | متى يُطلَق | الاستخدام النموذجي |
| --- | --- | --- |
| `pygame.KEYDOWN` | لحظة الضغط على المفتاح | إطلاق رصاصة، تبديل حالة |
| `pygame.KEYUP` | لحظة إفلات المفتاح | إيقاف الحركة |

| السمة | النوع | المعنى |
| --- | --- | --- |
| `event.key` | `int` | معرّف رقمي لكل مفتاح (مثل `pygame.K_SPACE`) |
| `event.mod` | `int (bitmask)` | أيّ مفاتيح التعديل (`Shift`، `Ctrl`) كانت مضغوطة |

#### 💻 الكود: P_4.py — كشف أحداث المفاتيح

#### ما هذا الكود؟
> يطبع اسم كل مفتاح يُضغَط أو يُفلَت في وحدة التحكم.

```python
import pygame  # Import pygame

pygame.init()  # Initialize
pygame.display.set_caption('Keyboard events')  # Window title
pygame.display.set_mode((400, 400))  # Create window (required for events)
done = False

while not done:
    event = pygame.event.wait()  # Wait for next event (blocking — efficient)

    if event.type == pygame.QUIT:  # Close button
        done = True

    if event.type in (pygame.KEYDOWN, pygame.KEYUP):  # Any key event
        key_name = pygame.key.name(event.key)  # Get human-readable key name
        key_name = key_name.upper()  # Convert to uppercase for display

        if event.type == pygame.KEYDOWN:
            print('"{}" key pressed'.format(key_name))  # Print press event
        elif event.type == pygame.KEYUP:
            print('"{}" key released'.format(key_name))  # Print release event

pygame.quit()  # Cleanup
```

#### شرح كل سطر:
1. `pygame.event.wait()` → يتوقف البرنامج حتى يصل حدث (أكفأ من `event.get()` عند عدم وجود حركة).
2. `event.type in (pygame.KEYDOWN, pygame.KEYUP)` → يتحقق من كلا النوعين في سطر واحد.
3. `pygame.key.name(event.key)` → يحوّل الرقم الصحيح للمفتاح إلى اسمه النصي (مثل `"down"`، `"right ctrl"`).
4. `key_name.upper()` → يحوّل الاسم إلى أحرف كبيرة (`"DOWN"`، `"RIGHT CTRL"`).

**الناتج المتوقع (لقطة الشاشة):**
> طباعة في وحدة التحكم مثل: `"DOWN" key pressed` / `"DOWN" key released`

#### 🖼️ وصف الشاشة: P_4.py (الناتج)

> **الصفحة/الشريحة:** 14
> **ملاحظة:** لا يمكن عرض لقطة الشاشة في الموقع — الوصف التالي يغطي كل عنصر.

| العنصر | الموقع | الوظيفة |
| --- | --- | --- |
| وحدة التحكم (Console) | على اليسار | تطبع أحداث المفاتيح مثل `"DOWN" key pressed` |
| نافذة `pygame` | على اليمين | نافذة سوداء (للأحداث فقط، لا رسم) |

---

### 10. التحكم بالكائن بالمفاتيح — P_5.py

#### النص الأصلي يقول:
> كود P_5.py يتحكم في موضع مستطيل باستخدام مفاتيح الأسهم، ويغيّر لونه بـ SPACE.

#### الشرح المبسّط:
يُميّز الكود بين `pygame.key.get_pressed()` (للحركة المستمرة) و`KEYDOWN` events (لتبديل الحالة مرة واحدة).

#### 💻 الكود: P_5.py — تحريك مستطيل بالأسهم

#### ما هذا الكود؟
> يرسم مستطيلاً يمكن تحريكه بالأسهم وتغيير لونه بـ`SPACE`.

```python
import pygame  # Import pygame

pygame.init()  # Initialize
screen = pygame.display.set_mode((400, 300))  # Create window
done = False  # Loop control flag
is_blue = True   # Color state: True=blue, False=orange
x, y = 30, 30    # Initial rectangle position

while not done:
    for event in pygame.event.get():  # Handle events
        if event.type == pygame.QUIT:
            done = True
        # Toggle color only once per key press (not continuously)
        if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
            is_blue = not is_blue  # Flip color state

    pressed = pygame.key.get_pressed()  # Get all currently held keys

    if pressed[pygame.K_UP]:    y -= 3  # Move up: decrease y
    if pressed[pygame.K_DOWN]:  y += 3  # Move down: increase y
    if pressed[pygame.K_LEFT]:  x -= 3  # Move left: decrease x
    if pressed[pygame.K_RIGHT]: x += 3  # Move right: increase x

    if is_blue:
        color = (0, 128, 255)   # Blue color
    else:
        color = (255, 100, 0)   # Orange color

    pygame.draw.rect(screen, color, pygame.Rect(x, y, 60, 60))  # Draw rectangle
    pygame.display.flip()  # Update display

pygame.quit()  # Cleanup
```

#### شرح كل سطر:
1. `pygame.KEYDOWN and event.key == pygame.K_SPACE` → يكشف ضغطة `SPACE` مرة واحدة (لا يتكرر إذا ظلّ مضغوطاً).
2. `is_blue = not is_blue` → `toggle` — يعكس الحالة بين `True` و`False`.
3. `pygame.key.get_pressed()` → يُرجع قاموساً فورياً لكل المفاتيح المضغوطة **الآن** — مناسب للحركة المستمرة.
4. `y -= 3` → في `pygame` المحور `Y` ينمو **للأسفل**، لذا الحركة للأعلى تُقلّل `y`.

**المكتبات المطلوبة (Imports):**
> `import pygame`

**الناتج المتوقع (لقطة الشاشة):**
> مستطيل أزرق يتحرك بمفاتيح الأسهم؛ اضغط `SPACE` ليتحول للون البرتقالي.

#### ملاحظة:
> الفرق الأساسي: `pygame.event.get()` + `KEYDOWN` للمفاتيح التي يجب الاستجابة لها مرة واحدة. `pygame.key.get_pressed()` للمفاتيح التي تحتاج استجابة مستمرة طالما مضغوطة.

---

### 11. `Pygame Draw` — دوال الرسم

#### النص الأصلي يقول:
> Pygame provides geometry functions to draw simple shapes to the surface. These functions will work for rendering to any format to surfaces. Most of the functions accept a width argument to signify the size of the thickness around the edge of the shape. If the width is passed 0, then the shape will be solid (filled). All the drawing function takes the color argument that can be one of the following formats: A pygame.Color objects / An (RGB) triplet(tuple/list) / An (RGBA) quadruplet(tuple/list) / An integer value that has been mapped to the surface's pixel format.

#### الشرح المبسّط:
`pygame.draw` هي مجموعة دوال ترسم أشكالاً هندسية مباشرة على `Surface`. كل دالة تأخذ: السطح المستهدف، اللون، المعاملات الهندسية، وسُمك الحافة.

| قيمة `width` | النتيجة |
| --- | --- |
| `0` (الافتراضي) | شكل مملوء (Filled) |
| `> 0` | حافة فقط بسُمك محدد |
| `< 0` | لا شيء يُرسم |

| صيغ اللون | مثال |
| --- | --- |
| `pygame.Color` object | `pygame.Color('red')` |
| `RGB tuple/list` | `(255, 0, 0)` |
| `RGBA quadruplet` | `(255, 0, 0, 128)` — الأخير: الشفافية |
| `integer` | `0xFF0000` |

#### جدول دوال الرسم:

| الدالة | الشكل | المعاملات الأساسية |
| --- | --- | --- |
| `pygame.draw.rect(surface, color, rect, width=0)` | مستطيل | `Rect(x, y, w, h)` |
| `pygame.draw.circle(surface, color, center, radius, width=0)` | دائرة | `center=(x,y)`, `radius` |
| `pygame.draw.ellipse(surface, color, rect, width=0)` | بيضاوي | `Rect(x, y, w, h)` |
| `pygame.draw.line(surface, color, start, end, width=1)` | خط مستقيم | `start=(x,y)`, `end=(x,y)` |
| `pygame.draw.lines(surface, color, closed, points, width=1)` | خطوط متعددة | `points=[(x1,y1),...]` |
| `pygame.draw.polygon(surface, color, points, width=0)` | مضلع | `points=[(x1,y1),...]` |
| `pygame.draw.arc(surface, color, rect, start_angle, stop_angle, width=1)` | قوس | الزوايا بالراديان |

---

### 11.1. رسم مستطيل — `draw.rect()`

#### النص الأصلي يقول:
> pygame.draw.rect(surface, color, rect) / pygame.draw.rect(surface, color, rect, width=0). Parameters: surface - Screen to draw on. color - color the shape. rect(Rect) - Draw rectangle, position, and dimensions. width(int) - Optional.

#### المعاملات بالتفصيل:
| المعامل | النوع | الوصف |
| --- | --- | --- |
| `surface` | `Surface` | السطح الذي يُرسم عليه |
| `color` | `tuple` \| `Color` | لون الشكل |
| `rect` | `Rect` \| `tuple` | `(x, y, width, height)` |
| `width` | `int` | `0` = ممتلئ، `>0` = سُمك الحافة، `<0` = لا شيء |

---

### 11.2. رسم مضلع — `draw.polygon()`

#### النص الأصلي يقول:
> pygame.draw.polygon(surface, color, points) / pygame.draw.polygon(surface, color, points, width=0). points: A sequence of 3 or more (x,y) coordinates that make up the vertices. Note: If len(points) < 3 raises ValueError.

```python
# Draw orange triangle (outline only, width=5)
pygame.draw.polygon(screen, (255, 100, 0), [[100, 100], [0, 200], [200, 200]], 5)
```

#### ملاحظة:
> إذا كان عدد النقاط أقل من 3، أو النقاط ليست أزواج أرقام، يُرمى `ValueError`.

---

### 11.3. رسم قطع ناقص — `draw.ellipse()`

#### النص الأصلي يقول:
> pygame.draw.ellipse(surface, color, rect) — rect defines the bounding rectangle of the ellipse.

```python
pygame.draw.ellipse(screen, (255, 0, 0), [225, 10, 50, 20], 2)  # Outlined ellipse
pygame.draw.ellipse(screen, (255, 0, 0), [300, 10, 50, 20])     # Filled ellipse
```

---

### 11.4. رسم خط مستقيم — `draw.line()`

#### النص الأصلي يقول:
> pygame.draw.line(surface, color, start_pos, end_pos, width=1). start_pos: start position of the line(x,y). end_pos: End position of the line. No endcaps.

```python
pygame.draw.line(screen, (0, 255, 0), [0, 0], [50, 30], 5)  # Green line, thickness 5
```

---

### 11.5. رسم دائرة — `draw.circle()`

#### النص الأصلي يقول:
> circle(surface, color, center, radius, width=0). center: sequence of two int/float (x,y). radius: if zero, only center pixel drawn.

```python
pygame.draw.circle(screen, (0, 0, 255), [60, 250], 40)  # Filled blue circle
```

---

### 11.6. رسم قوس — `draw.arc()`

#### النص الأصلي يقول:
> arc(surface, color, rect, start_angle, stop_angle, width=1). Angles in radians. a. If start_angle < stop_angle then the arc will be drawn counter-clockwise. b. If start_angle > stop_angle then tau (2*pi) will be added to stop angle. c. If start_angle == stop_angle, nothing will be drawn.

```python
from math import pi
pygame.draw.arc(screen, (0, 0, 255), [210, 175, 150, 125], 0, pi / 2, 5)
```

#### 💻 الكود: P_6.py — رسم أشكال متعددة

#### ما هذا الكود؟
> يرسم جميع أنواع الأشكال الهندسية المتاحة في `pygame` على شاشة واحدة.

```python
import pygame
from math import pi  # Import pi for arc angles

pygame.init()
size = [400, 300]
screen = pygame.display.set_mode(size)
pygame.display.set_caption("Example program to draw geometry")
done = False
clock = pygame.time.Clock()

while not done:
    clock.tick(10)  # Limit to 10 FPS (static scene, no need for high FPS)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True

    screen.fill((0, 0, 0))  # Black background

    # Line: green, from (0,0) to (50,30), thickness 5
    pygame.draw.line(screen, (0, 255, 0), [0, 0], [50, 30], 5)

    # Multiple connected lines: white, not closed
    pygame.draw.lines(screen, (255, 255, 255), False, [[0, 80], [50, 90], [200, 80], [220, 30]], 5)

    # Outlined rectangle: teal color
    pygame.draw.rect(screen, (100, 150, 150), [75, 10, 50, 20], 2)

    # Filled rectangle: purple
    pygame.draw.rect(screen, (150, 100, 255), [150, 10, 50, 20])

    # Outlined ellipse: red
    pygame.draw.ellipse(screen, (255, 0, 0), [225, 10, 50, 20], 2)

    # Filled ellipse: red
    pygame.draw.ellipse(screen, (255, 0, 0), [300, 10, 50, 20])

    # Outlined triangle (polygon): orange
    pygame.draw.polygon(screen, (255, 100, 0), [[100, 100], [0, 200], [200, 200]], 5)

    # Filled circle: blue
    pygame.draw.circle(screen, (0, 0, 255), [60, 250], 40)

    # Arc: blue, from 0 to pi/2 radians (quarter circle)
    pygame.draw.arc(screen, (0, 0, 255), [210, 175, 150, 125], 0, pi / 2, 5)

    pygame.display.flip()  # Show frame

pygame.quit()
```

#### شرح كل سطر:
1. `from math import pi` → `pi ≈ 3.14159` — مطلوب لتحديد زوايا `draw.arc()` بالراديان.
2. `clock.tick(10)` → 10 إطار/ثانية كافٍ للمشهد الثابت — يُقلّل استهلاك المعالج.
3. `pygame.draw.lines(..., False, points, 5)` → `False` = غير مغلق (لا يوصل آخر نقطة بأول نقطة).

**الناتج المتوقع (لقطة الشاشة):**
> خلفية سوداء تعرض: خطاً أخضر، خطوطاً بيضاء متعددة، مستطيلاً مخططاً بالتيل، مستطيلاً بنفسجياً ممتلئاً، بيضاويّاً أحمر مخططاً، بيضاوياً أحمر ممتلئاً، مثلثاً برتقالياً، دائرة زرقاء، وقوساً أزرق.

---

### 12. `Pygame Text and Font` — النصوص والخطوط

#### النص الأصلي يقول:
> We can load fonts from the system by using the pygame.font.SysFont() function. The font objects are created with pygame.font.Font(). Font objects are generally used to render the text into new Surface objects. render(): used to draw text on a new Surface. size(): used to determine space/positioning needed. set_bold(): for bold rendering.

#### الشرح المبسّط:
لعرض نص في `pygame` يجب: اختيار خط، تحديد حجمه، ثم "طبعه" (`render`) على `Surface`، ثم رسم ذلك `Surface` على الشاشة.

**لماذا هذه الخطوات؟** لأن `pygame` يعامل النص كصورة — يحوّله إلى `Surface` أولاً ثم يرسمه كأي صورة أخرى.

| الدالة | الغرض | النحو |
| --- | --- | --- |
| `pygame.font.SysFont(name, size)` | تحميل خط من النظام | `font = pygame.font.SysFont("Arial", 36)` |
| `pygame.font.Font(file, size)` | تحميل خط من ملف | `font = pygame.font.Font("myfont.ttf", 36)` |
| `font.render(text, antialias, color)` | رسم النص على `Surface` | `surface = font.render("Hi", True, (255,0,0))` |
| `font.size(text)` | حساب أبعاد النص قبل الرسم | `width, height = font.size("Hi")` |
| `font.set_bold(True)` | تفعيل الخط العريض | `font.set_bold(True)` |

#### 💻 الكود: P_7.py — عرض نص على الشاشة

#### ما هذا الكود؟
> يعرض نص "Hello, Pygame" بلون أحمر داكن في وسط الشاشة.

```python
import pygame  # Import pygame

pygame.init()  # Initialize
screen = pygame.display.set_mode((640, 480))  # 640x480 window
done = False

# Create font object: Times New Roman, size 72
font = pygame.font.SysFont("Times new Roman", 72)

# Render text to Surface: text, antialias=True, color=dark red
text = font.render("Hello, Pygame", True, (158, 16, 16))

while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True
        if event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
            done = True  # ESC key also exits

    screen.fill((255, 255, 255))  # White background

    # Center the text: screen_center - half_text_size
    screen.blit(text, (320 - text.get_width() // 2, 240 - text.get_height() // 2))

    pygame.display.flip()  # Show frame

pygame.quit()  # Cleanup
```

#### شرح كل سطر:
1. `pygame.font.SysFont("Times new Roman", 72)` → يبحث عن خط "Times New Roman" في نظام التشغيل بحجم 72 نقطة.
2. `font.render("Hello, Pygame", True, (158, 16, 16))` → `True` تعني تفعيل `antialiasing` (تنعيم حواف الحروف).
3. `text.get_width()` → يُرجع عرض `Surface` النصي بالبكسل.
4. `320 - text.get_width() // 2` → يحسب إحداثي x بحيث يكون النص في المنتصف الأفقي (مركز الشاشة 320 − نصف عرض النص).

**الناتج المتوقع (لقطة الشاشة):**
> خلفية بيضاء، نص "Hello, Pygame" بخط كبير لون أحمر داكن في مركز الشاشة.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا يُحسَب `320 - text.get_width() // 2` بدلاً من مجرد `0`؟
> **لماذا هذا مهم؟** لأن `blit` يضع الزاوية العليا اليسرى للنص عند الإحداثي المحدد. لتوسيط النص يجب طرح نصف عرضه من مركز الشاشة.

---

### 13. `Pygame Sprite` واكتشاف التصادم

#### النص الأصلي يقول:
> A pygame sprite is a two-dimensional image that is part of the large graphical scene. Usually, a sprite will be some object in the scene. One of the most advantages of working with sprites is the ability to work with them in groups. We can easily move and draw all the sprites with the one command if they are in the group. The Sprite module contains the various simple classes. Pygame provides sprites and sprite groups that help for collision detection. Collision detection is the process when two objects on the screen collide each other.

#### الشرح المبسّط:
`Sprite` هو كائن في اللعبة — شخصية، عدو، رصاصة. يجمع الصورة والـ`Rect` معاً في كائن واحد. `SpriteGroup` يتيح تحريك ورسم مئات الـ`sprites` بأمر واحد. `Collision detection` يكتشف متى يتلامس كائنان.

**لماذا `Sprite` بدلاً من مجرد صورة وإحداثيات؟** لأن الكائن الموحّد أسهل للإدارة، وجماعات الـ`Sprite` تتعامل مع التصادمات تلقائياً.

💡 **التشبيه:**
> `Sprite` مثل لاعب كرة قدم — لديه صورة (قميصه)، موضع (`Rect`، مكانه في الملعب)، وينتمي لمجموعة (الفريق).
> **وجه الشبه:** فريق الكرة = `SpriteGroup`، اللاعب = `Sprite`.

#### 💻 الكود: P_8.py — Sprite + Collision Detection

#### ما هذا الكود؟
> كائن لاعب (أرجواني) يتحرك بالأسهم ويكتشف تصادمه مع جدار (أرجواني ثابت).

```python
import pygame  # Import pygame
import sys     # Import sys for exit

# Custom Sprite class inheriting from pygame.sprite.Sprite
class MSprite(pygame.sprite.Sprite):
    def __init__(self, pos):
        pygame.sprite.Sprite.__init__(self)  # Initialize parent class
        self.image = pygame.Surface([20, 20])  # Create 20x20 pixel surface
        self.image.fill((255, 0, 255))         # Fill with magenta color
        self.rect = self.image.get_rect()      # Get Rect from Surface
        self.rect.center = pos                  # Set center position

def main():
    pygame.init()  # Initialize pygame
    clock = pygame.time.Clock()  # Clock for FPS control
    fps = 50  # 50 frames per second
    bg = [0, 0, 0]  # Black background
    size = [300, 300]  # Window size
    screen = pygame.display.set_mode(size)

    # Create player sprite at position (40, 150)
    player = MSprite([40, 150])
    # Assign movement keys to player
    player.move = [pygame.K_LEFT, pygame.K_RIGHT, pygame.K_UP, pygame.K_DOWN]
    player.vx = 5  # Horizontal velocity
    player.vy = 5  # Vertical velocity

    # Create wall sprite at position (100, 60)
    wall = MSprite([100, 60])

    # Create sprite groups
    wall_group = pygame.sprite.Group()
    wall_group.add(wall)     # Add wall to wall group
    player_group = pygame.sprite.Group()
    player_group.add(player) # Add player to player group

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return False  # Exit main loop

        key = pygame.key.get_pressed()  # Get currently held keys

        # Horizontal movement: LEFT and RIGHT (index 0 and 1)
        for i in range(2):
            if key[player.move[i]]:
                player.rect.x += player.vx * [-1, 1][i]  # -1 for left, +1 for right

        # Vertical movement: UP and DOWN (index 2 and 3)
        for i in range(2):
            if key[player.move[2:4][i]]:
                player.rect.y += player.vy * [-1, 1][i]  # -1 for up, +1 for down

        screen.fill(bg)  # Clear screen

        # Check for collision between player and wall_group; True = remove wall on hit
        hit = pygame.sprite.spritecollide(player, wall_group, True)
        if hit:
            player.image.fill((255, 255, 255))  # Change player to white on collision

        player_group.draw(screen)  # Draw all player sprites
        wall_group.draw(screen)    # Draw all wall sprites

        pygame.display.update()  # Update display
        clock.tick(fps)          # Control FPS

    pygame.quit()  # Cleanup
    sys.exit        # Exit

main()  # Run main function
```

#### شرح كل سطر:
1. `class MSprite(pygame.sprite.Sprite):` → يُنشئ `Sprite` مخصص بالوراثة من `pygame.sprite.Sprite`.
2. `pygame.sprite.Sprite.__init__(self)` → استدعاء `__init__` الأصل ضروري لتهيئة بنية `Sprite` الداخلية.
3. `self.image = pygame.Surface([20, 20])` → كل `Sprite` **يجب** أن يملك `self.image` و`self.rect`.
4. `self.rect = self.image.get_rect()` → يستخرج `Rect` من الـ`Surface`.
5. `self.rect.center = pos` → يضبط مركز المستطيل على الموضع المُمرَّر.
6. `player.move = [pygame.K_LEFT, ...]` → قائمة مفاتيح مخصصة للاعب (قابلة للتغيير).
7. `player.vx * [-1, 1][i]` → حيلة أنيقة: `i=0` → ضرب `-1` (يسار)، `i=1` → ضرب `+1` (يمين).
8. `pygame.sprite.spritecollide(player, wall_group, True)` → يُرجع قائمة الـ`sprites` المتصادمة؛ `True` يحذفها من المجموعة.

**المكتبات المطلوبة (Imports):**
> `import pygame` | `import sys`

**الناتج المتوقع (لقطة الشاشة):**
> مربعان أرجوانيان — اللاعب متحرك، الجدار ثابت. عند التصادم يتحول اللاعب لأبيض ويختفي الجدار.

#### مهم للامتحان ⚠️:
> كل `Sprite` يجب أن يملك `self.image` (كائن `Surface`) و`self.rect` (كائن `Rect`). هذان الاثنان مطلوبان لكي تعمل `SpriteGroup.draw()` و`spritecollide()` بشكل صحيح.

---

### 14. `Frames Per Second (FPS)` — التحكم في سرعة اللعبة

#### النص الأصلي يقول:
> Computer's are extremely fast and can complete millions of loop cycles in under a second. As reference, movies are run at 24 frames per second. Anything less than that will have obvious stutter to it, and values over 100 may cause the things to move too fast for us to see. The tick() method belongs to the pygame.time.Clock class and must be used with an object of this class. FPS = pygame.time.Clock() / FPS.tick(60) # 30-60

#### الشرح المبسّط:
بدون تحديد `FPS`، ستُنفَّذ حلقة اللعبة آلاف المرات في الثانية — الكائنات ستتحرك بسرعة جنونية وغير ثابتة على أجهزة مختلفة. `clock.tick(60)` يضمن أقصاه 60 إطار/ثانية.

**لماذا؟** لأن الحركة يجب أن تعتمد على الوقت لا على سرعة الجهاز.

💡 **التشبيه:**
> `FPS` مثل سرعة مروحة متحكم بها — بدون تحديد السرعة قد تدور بأقصى سرعتها وتُحدث ضجيجاً بدلاً من الرياح اللطيفة.
> **وجه الشبه:** تحديد سرعة المروحة = `FPS.tick(60)`.

| قيمة FPS | التأثير |
| --- | --- |
| `< 24` | وميض واضح (stutter) |
| `24-30` | حد الأفلام — مقبول |
| `60` | ناعم جداً — الهدف للألعاب |
| `> 100` | أسرع مما يراه العين — مضيعة موارد |

```python
FPS = pygame.time.Clock()  # Create clock object
FPS.tick(60)               # Call this INSIDE the game loop — limits to 60 FPS
```

---

### 15. مقارنة `Pygame` و`Pyglet`

#### النص الأصلي يقول:
> جدول المقارنة بين Pyglet وPygame.

| المعيار | `Pyglet` | `Pygame` |
| --- | --- | --- |
| دعم 3D | نعم (مدمج مع `OpenGL`) | لا (2D فقط) |
| Cross-platform | `Windows`، `Linux`، `OS X` | نفس المنصات |
| اللغة | `Pure Python` | `Python + C bindings` |
| الشعبية | أقل شعبية (مجتمع أصغر) | أكثر شعبية |
| واجهة API | بسيطة | بسيطة جداً |
| نظام الرسم | محدود | `Best canvas system` — رسم غير محدود |

#### ⚖️ المقايضة: `Pygame` مقابل `Pyglet`

| | `Pygame` | `Pyglet` |
| --- | --- | --- |
| المزايا | شعبية كبيرة، مجتمع ضخم، API بسيطة | دعم 3D، `pure Python`، خفيف |
| العيوب | 2D فقط، تعتمد على `C` | مجتمع أصغر، توثيق أقل |
| متى تختاره | ألعاب 2D، تعلم البرمجة | ألعاب 3D بسيطة، تطبيقات OpenGL |

---

### 16. لعبة كاملة — لعبة السيارات (Car Game)

#### النص الأصلي يقول:
> كود P_final.py يُجسّد لعبة سيارات كاملة: لاعب (سيارة زرقاء)، عدو (سيارة حمراء)، طريق متحرك، نقاط، اكتشاف تصادم، زيادة السرعة مع الوقت.

#### 🖼️ وصف الشاشة: لعبة السيارات

> **الصفحة/الشريحة:** 27
> **ملاحظة:** لا يمكن عرض لقطة الشاشة في الموقع — الوصف التالي يغطي كل عنصر.

| العنصر | الموقع | الوظيفة |
| --- | --- | --- |
| طريق رمادي | الخلفية كاملة | خلفية اللعبة (صورة `AnimatedStreet.png`) |
| خطوط بيضاء | وسط الطريق | علامات المسارات المتحركة |
| خطوط صفراء | حواف الطريق | حدود الطريق |
| سيارة حمراء (العدو) | يتحرك نزولاً | يأتي من الأعلى بسرعة متزايدة |
| سيارة زرقاء (اللاعب) | أسفل الشاشة | يتحرك يميناً/يساراً بمفاتيح الأسهم |
| عداد النقاط | أعلى اليسار | يعرض `SCORE` |

#### 💻 الكود: لعبة السيارات — الإعداد

#### ما هذا الكود؟
> إعداد متغيرات اللعبة، تهيئة الألوان، الشاشة، الخطوط، والخلفية.

```python
import pygame, sys
from pygame.locals import *
import random, time

pygame.init()
FPS = 60
FramePerSec = pygame.time.Clock()

# Color definitions
BLUE  = (0, 0, 255)
RED   = (255, 0, 0)
GREEN = (0, 255, 0)
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

SCREEN_WIDTH  = 400
SCREEN_HEIGHT = 600
SPEED = 5    # Enemy car speed (increases over time)
SCORE = 0    # Player score

# Font setup
font       = pygame.font.SysFont("Verdana", 60)
font_small = pygame.font.SysFont("Verdana", 20)
game_over  = font.render("Game Over", True, BLACK)

# Load background image
background = pygame.image.load("AnimatedStreet.png")

# Create display
DISPLAYSURF = pygame.display.set_mode((400, 600))
DISPLAYSURF.fill(WHITE)
pygame.display.set_caption("Game")
```

#### 💻 الكود: لعبة السيارات — كلاس العدو

#### ما هذا الكود؟
> `Sprite` للسيارة العدو — تنزل من الأعلى وتعاد عشوائياً عند الخروج.

```python
class Enemy(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()  # Initialize parent Sprite class
        self.image = pygame.image.load("enemy.png")  # Load enemy car image
        self.surf = pygame.Surface((50, 80))          # Logical surface
        # Spawn at random x position at top of screen
        self.rect = self.surf.get_rect(center=(random.randint(40, SCREEN_WIDTH - 40), 0))

    def move(self):
        global SCORE               # Access global score variable
        self.rect.move_ip(0, SPEED)  # Move down by SPEED pixels
        if self.rect.top > 600:    # If enemy passed bottom of screen
            SCORE += 1             # Increase score (survived one enemy)
            self.rect.top = 0     # Reset to top
            self.rect.center = (random.randint(30, 370), 0)  # Random x position
```

#### 💻 الكود: لعبة السيارات — كلاس اللاعب

#### ما هذا الكود؟
> `Sprite` للسيارة اللاعب — تتحرك يميناً ويساراً فقط بقيود الحدود.

```python
class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()  # Initialize parent
        self.image = pygame.image.load("download.png")  # Load player car image
        self.surf = pygame.Surface((50, 100))
        self.rect = self.surf.get_rect(center=(150, 500))  # Start at bottom center

    def move(self):
        pressed_keys = pygame.key.get_pressed()  # Get held keys

        # Move left only if not at left boundary
        if self.rect.left > 0:
            if pressed_keys[K_LEFT]:
                self.rect.move_ip(-5, 0)

        # Move right only if not at right boundary
        if self.rect.right < SCREEN_WIDTH:
            if pressed_keys[K_RIGHT]:
                self.rect.move_ip(5, 0)
```

#### 💻 الكود: لعبة السيارات — حلقة اللعبة الرئيسية

#### ما هذا الكود؟
> حلقة اللعبة: رسم، حركة، تصادم، زيادة السرعة، شاشة Game Over.

```python
P1 = Player()   # Create player instance
E1 = Enemy()    # Create enemy instance

enemies     = pygame.sprite.Group()
enemies.add(E1)

all_sprites = pygame.sprite.Group()
all_sprites.add(P1)
all_sprites.add(E1)

# Custom user event: increase speed every 1000ms (1 second)
INC_SPEED = pygame.USEREVENT + 1
pygame.time.set_timer(INC_SPEED, 1000)

while True:
    for event in pygame.event.get():
        if event.type == INC_SPEED:
            SPEED += 0.5  # Gradually increase enemy speed
        if event.type == QUIT:
            pygame.quit()
            sys.exit()

    DISPLAYSURF.blit(background, (0, 0))  # Draw road background

    scores = font_small.render(str(SCORE), True, BLACK)  # Render score
    DISPLAYSURF.blit(scores, (10, 10))                   # Display score top-left

    # Move and draw all sprites
    for entity in all_sprites:
        DISPLAYSURF.blit(entity.image, entity.rect)  # Draw sprite
        entity.move()                                  # Move sprite

    # Check if player hit any enemy
    if pygame.sprite.spritecollideany(P1, enemies):
        pygame.mixer.Sound('crash.wav').play()  # Play crash sound
        time.sleep(0.5)                          # Brief pause
        DISPLAYSURF.fill(RED)                    # Flash red screen
        DISPLAYSURF.blit(game_over, (30, 250))   # Show Game Over text
        pygame.display.update()
        for entity in all_sprites:
            entity.kill()  # Remove all sprites
        time.sleep(2)      # Wait 2 seconds
        pygame.quit()
        sys.exit()

    pygame.display.update()       # Update display
    FramePerSec.tick(FPS)         # Control FPS
```

#### شرح كل سطر (المقاطع الجوهرية):
1. `pygame.USEREVENT + 1` → ينشئ حدثاً مخصصاً للمستخدم (أرقام `USEREVENT` لن تتعارض مع أحداث `pygame` الداخلية).
2. `pygame.time.set_timer(INC_SPEED, 1000)` → يُطلق حدث `INC_SPEED` كل 1000 ملي ثانية (كل ثانية).
3. `SPEED += 0.5` → زيادة تدريجية للصعوبة — `float` مسموح به.
4. `pygame.sprite.spritecollideany(P1, enemies)` → يتحقق من تصادم `P1` مع **أي** عضو في `enemies` (أسرع من `spritecollide`).
5. `entity.kill()` → يُزيل الـ`Sprite` من كل المجموعات التي ينتمي إليها.

**المكتبات المطلوبة (Imports):**
> `import pygame, sys` | `from pygame.locals import *` | `import random, time`

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `pygame` | مكتبة `Python` لتطوير الألعاب ثنائية الأبعاد | `import pygame` |
| `Surface` | لوح رسم مستطيل في `pygame` | `pygame.Surface((w, h))` |
| `Rect` | كائن يمثّل مستطيلاً بإحداثيات وأبعاد | `pygame.Rect(x, y, w, h)` |
| `Game Loop` | الحلقة الرئيسية: أحداث → تحديث → رسم | `while not done:` |
| `Sprite` | كائن لعبة ثنائي الأبعاد (`Surface + Rect`) | `class Player(pygame.sprite.Sprite)` |
| `SpriteGroup` | مجموعة `Sprite` لإدارتها معاً | `pygame.sprite.Group()` |
| `Collision Detection` | اكتشاف تلامس كائنين | `pygame.sprite.spritecollide()` |
| `FPS` | إطارات في الثانية — سرعة تحديث اللعبة | `clock.tick(60)` |
| `blit` | رسم `Surface` على `Surface` آخر | `screen.blit(image, (x, y))` |
| `double buffering` | رسم في الخلفية وعرضه دفعة واحدة | `pygame.display.flip()` |
| `KEYDOWN` | حدث ضغط المفتاح | `event.type == pygame.KEYDOWN` |
| `KEYUP` | حدث إفلات المفتاح | `event.type == pygame.KEYUP` |
| `antialiasing` | تنعيم حواف الخط عند الرسم | `font.render(text, True, color)` |

---

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `pygame.init()` | تهيئة جميع `modules` | أول سطر دائماً |
| `pygame.quit()` | تنظيف الموارد | آخر سطر دائماً |
| `pygame.display.set_mode((w,h))` | إنشاء النافذة وإرجاع `Surface` | مطلوب قبل كل رسم |
| `pygame.display.flip()` | عرض الإطار الحالي | نهاية كل دورة |
| `pygame.display.update()` | مرادف لـ`flip()` | نفس الوظيفة |
| `pygame.event.get()` | تفريغ قائمة الأحداث | يمنع تجمّد النافذة |
| `pygame.key.get_pressed()` | حالة كل المفاتيح الآن | للحركة المستمرة |
| `pygame.image.load(path)` | تحميل صورة من القرص | يُرجع `Surface` |
| `pygame.font.SysFont(name, size)` | تحميل خط النظام | `render()` للطباعة |
| `pygame.time.Clock()` | كائن التحكم في `FPS` | `.tick(n)` داخل الحلقة |
| `pygame.sprite.Group()` | مجموعة `Sprite` | `.draw()` و`.update()` |
| `pygame.sprite.spritecollide()` | تصادم `Sprite` مع مجموعة | `True` يحذف المتصادم |
| `pygame.USEREVENT` | بداية نطاق الأحداث المخصصة | `+1`، `+2` … |

---

### جداول مقارنات سريعة

| المقارنة | `KEYDOWN` event | `key.get_pressed()` |
| --- | --- | --- |
| الاستخدام | حدث لحظي (ضغطة واحدة) | استعلام مستمر |
| مثال | إطلاق رصاصة، تبديل لون | تحريك جسم |
| المكان | داخل `for event in pygame.event.get()` | خارج الـ`for` في الحلقة |

| المقارنة | `pygame.display.flip()` | `pygame.display.update()` |
| --- | --- | --- |
| ما يفعله | يُحدّث الشاشة كاملة | يُحدّث الشاشة (أو جزء منها) |
| المرونة | لا يقبل حججاً | يقبل `Rect` لتحديث جزئي |
| الاستخدام الشائع | أكثر شيوعاً | عند الحاجة لتحسين الأداء |

| المقارنة | `spritecollide` | `spritecollideany` |
| --- | --- | --- |
| المُرجَع | قائمة بجميع المتصادمين | أول `Sprite` متصادم (أو `None`) |
| الأداء | أبطأ قليلاً | أسرع (يتوقف عند أول تصادم) |
| الاستخدام | عند الحاجة لمعرفة الكل | للتحقق فقط هل حدث تصادم؟ |

---

### قاموس المصطلحات

| الفئة | المصطلحات |
| --- | --- |
| التهيئة والإغلاق | `pygame.init()`، `pygame.quit()`، `pygame.display.set_mode()` |
| الرسم | `Surface`، `blit()`، `fill()`، `pygame.draw.*`، `flip()` |
| الأشكال | `Rect`، `circle`، `ellipse`، `polygon`، `arc`، `line` |
| الأحداث | `QUIT`، `KEYDOWN`، `KEYUP`، `USEREVENT`، `event.key`، `event.mod` |
| الكائنات | `Sprite`، `SpriteGroup`، `self.image`، `self.rect`، `kill()` |
| التصادم | `spritecollide()`، `spritecollideany()` |
| الزمن | `pygame.time.Clock()`، `tick()`، `FPS`، `set_timer()` |
| الصوت | `pygame.mixer.Sound()`، `.play()` |
| النص | `SysFont()`، `Font()`، `render()`، `get_width()`، `get_height()` |

---

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| نسيان `pygame.event.get()` | النافذة تتجمّد — دائماً استدعِ `event.get()` في كل إطار |
| نسيان `pygame.display.flip()` | الشاشة لا تتحدث — ضعه آخر كل إطار |
| نسيان `pygame.sprite.Sprite.__init__(self)` في الـ`class` | خطأ في وقت التشغيل — ضعه أول شيء في `__init__` |
| استخدام `event.get()` بدلاً من `key.get_pressed()` للحركة | الحركة متقطعة — `event.get()` لمرة واحدة، `key.get_pressed()` للمستمرة |
| نسيان `screen.fill()` في بداية كل إطار | تراكم الصور — امسح الشاشة أول شيء في كل إطار |
| استخدام `rect.move()` وتوقع تعديل الأصل | لا تعديل — يجب إسناد النتيجة: `rect = rect.move(x, y)` |
| تمرير `width=-1` لـ`draw.rect()` | لا شيء يُرسم — `width<0` لا رسم، `width=0` ممتلئ |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: إنشاء أول نافذة `Pygame`

> إطار أساسي يستخدم في كل برنامج `pygame`.

```algorithm
1 | import pygame             | import statement         | استيراد المكتبة
2 | pygame.init()             | pygame module            | تهيئة كل الأنظمة الداخلية
3 | screen = pygame.display.set_mode((w, h)) | display module | إنشاء النافذة والحصول على Surface
4 | done = False              | Python variable          | متغير تحكم حلقة اللعبة
5 | while not done:           | Python loop              | بدء حلقة اللعبة الرئيسية
6 | for event in pygame.event.get(): | event module      | معالجة الأحداث المعلّقة
7 | if event.type == pygame.QUIT: | QUIT event          | الكشف عن طلب الإغلاق
8 | pygame.display.flip()     | display module           | عرض الإطار على الشاشة
9 | pygame.quit()             | pygame module            | تنظيف الموارد
```

#### نقاط التنفيذ:
- الخطوة 6 إلزامية — حتى لو لم تستخدم أحداثاً.
- الخطوة 8 يجب أن تكون داخل الحلقة وخارج حلقة الأحداث.

---

#### ⚙️ الخطوات / الخوارزمية: تحميل وعرض صورة

> إضافة صورة خارجية من القرص للشاشة.

```algorithm
1 | pygame.image.load(path)   | image module             | تحميل الصورة كـ Surface
2 | screen.fill(bg_color)     | Surface method           | مسح الشاشة بلون الخلفية (في كل إطار)
3 | screen.blit(image, (x,y)) | Surface method           | رسم الصورة على الشاشة عند الإحداثيات
4 | pygame.display.update()   | display module           | تحديث الشاشة
```

---

#### ⚙️ الخطوات / الخوارزمية: إنشاء `Sprite` مخصص

> الطريقة الصحيحة لإنشاء كائن لعبة.

```algorithm
1 | class MySprite(pygame.sprite.Sprite): | class definition | وراثة من Sprite الأصل
2 | pygame.sprite.Sprite.__init__(self)   | super().__init__() | تهيئة الأصل (إلزامية)
3 | self.image = pygame.Surface([w, h])   | Surface          | إنشاء السطح البصري
4 | self.image.fill(color)                | Surface method   | تلوين السطح
5 | self.rect = self.image.get_rect()     | Rect method      | استخراج Rect من الصورة
6 | self.rect.center = pos                | Rect attribute   | ضبط موضع الكائن
```

---

#### ⚙️ الخطوات / الخوارزمية: اكتشاف التصادم

> الفحص المتكرر للتصادم بين `Sprite` ومجموعة.

```algorithm
1 | wall_group = pygame.sprite.Group()       | Group class       | إنشاء مجموعة العوائق
2 | wall_group.add(wall)                     | Group method      | إضافة كائن للمجموعة
3 | hit = pygame.sprite.spritecollide(player, wall_group, True) | sprite module | فحص التصادم
4 | if hit:                                  | Python condition  | التصادم حدث؟
5 | player.image.fill(white)                 | Surface method   | تنفيذ رد الفعل على التصادم
```

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| `Game Loop` | `while not done: events → update → draw → flip` | في كل برنامج `pygame` |
| `Custom Sprite` | `class X(pygame.sprite.Sprite): __init__: image, rect` | لكل كائن لعبة |
| `Color Toggle` | `is_X = not is_X` | تبديل حالة بمفتاح |
| `Center Object` | `rect.center = (screen_w//2, screen_h//2)` | توسيط كائن |
| `Center Text` | `(screen_w//2 - text.get_width()//2, ...)` | توسيط نص |
| `Boundary Check` | `if self.rect.left > 0: move left` | منع الخروج من الشاشة |
| `Speed Increase` | `pygame.time.set_timer(EVENT, ms)` | زيادة الصعوبة تدريجياً |

---

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| حركة سلسة | `key.get_pressed()` داخل الحلقة | يُقرأ في كل إطار |
| ضغطة لمرة واحدة | `KEYDOWN` event | يُطلق مرة واحدة فقط |
| مسح الشاشة | `screen.fill(bg)` أول شيء في الإطار | يمنع تراكم الصور |
| تصادم + حذف | `spritecollide(..., True)` | الـ`True` يحذف الكائن المتصادم |
| التحكم في السرعة | `clock.tick(FPS)` آخر الإطار | يُنظّم عدد الإطارات |

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: متوسط/صعب. توزيع: مقارنات 20% / سيناريو كود 35% / تطبيق 30% / تتبع خوارزمية 15%.

---

### السؤال 1 (متوسط)
ماذا يُرجع `pygame.display.set_mode((400, 300))`؟

أ) عدد صحيح يمثّل معرّف النافذة
ب) كائن `Surface` يمثّل الشاشة المرئية
ج) كائن `Rect` بأبعاد 400×300
د) `None` لأن النافذة تُنشأ في الذاكرة

**الإجابة الصحيحة: ب**
**التعليل:** `set_mode()` يُنشئ النافذة ويُرجع `Surface` يمثّل الجزء المرئي منها — وهو ما تمرّره لدوال الرسم لاحقاً. (أ) خاطئ: لا يوجد "معرّف نافذة" كعدد. (ج) خاطئ: `Rect` لا يُستخدم هنا. (د) خاطئ: الإرجاع إلزامي وهو `Surface`.

---

### السؤال 2 (متوسط)
ما الفرق الجوهري بين `pygame.event.get()` و`pygame.event.wait()`؟

أ) `get()` تُرجع قائمة، `wait()` تُرجع حدثاً واحداً فقط
ب) `get()` تنتظر الأحداث، `wait()` لا تنتظر
ج) `get()` أبطأ دائماً من `wait()`
د) `wait()` لا تعمل مع `KEYDOWN`

**الإجابة الصحيحة: أ**
**التعليل:** `event.get()` تُفرّغ القائمة وتُرجع كل الأحداث المعلّقة. `event.wait()` تنتظر حتى يصل حدث واحد ثم تُرجعه فقط. (ب) معكوس: `wait()` هي التي تنتظر. (ج) `wait()` أكفأ في البيئات ذات الأحداث النادرة. (د) `wait()` تعمل مع كل الأحداث.

---

### السؤال 3 (صعب)
في كود P_5.py، لماذا يُستخدم `pygame.key.get_pressed()` للحركة بدلاً من `KEYDOWN` event؟

أ) لأن `KEYDOWN` لا يعمل مع مفاتيح الأسهم
ب) لأن `KEYDOWN` يُطلق مرة واحدة فقط عند الضغط، مما يجعل الحركة متقطعة
ج) لأن `get_pressed()` أسرع في المعالجة
د) لأن `KEYDOWN` لا يُرجع قيمة للمفتاح المضغوط

**الإجابة الصحيحة: ب**
**التعليل:** `KEYDOWN` حدث يُطلق مرة واحدة لحظة الضغط. للحركة المستمرة (طالما المفتاح مضغوط) نحتاج `get_pressed()` الذي يُقرأ في كل إطار. (أ) خاطئ: `KEYDOWN` يعمل مع الأسهم. (ج) ليس السبب الرئيسي. (د) خاطئ: `event.key` يُرجع المفتاح.

---

### السؤال 4 (صعب)
ما الناتج عند تنفيذ: `pygame.draw.rect(screen, (255,0,0), pygame.Rect(10,10,50,50), -1)`؟

أ) مستطيل أحمر ممتلئ
ب) مستطيل أحمر بحافة فقط
ج) لا شيء يُرسم
د) خطأ `TypeError`

**الإجابة الصحيحة: ج**
**التعليل:** عندما تكون قيمة `width < 0` في `pygame.draw.rect()` فلا شيء يُرسم على الإطلاق. (أ) يحدث عند `width=0` (الافتراضي). (ب) يحدث عند `width>0`. (د) لا يُرمى خطأ — `width=-1` قيمة مقبولة تعني "لا ترسم".

---

### السؤال 5 (متوسط)
في تعريف `Sprite` مخصص، ما العنصران الإلزاميان في `__init__`؟

أ) `self.speed` و`self.direction`
ب) `self.image` و`self.rect`
ج) `self.x` و`self.y`
د) `self.color` و`self.size`

**الإجابة الصحيحة: ب**
**التعليل:** `pygame.sprite.Group.draw()` تعتمد على `self.image` لمعرفة ما يُرسم، و`self.rect` لمعرفة أين يُرسم. بدونهما ستحدث أخطاء. (أ) اختياريان حسب اللعبة. (ج) يمكن استخدام `self.rect.x` بدلاً منهما. (د) ليسا إلزاميّين.

---

### السؤال 6 (متوسط)
ما الذي يفعله `pygame.sprite.spritecollide(player, wall_group, True)`؟

أ) يتحقق فقط هل `player` داخل حدود `wall_group`
ب) يُرجع قائمة المتصادمين ويُزيلهم من `wall_group`
ج) يُزيل `player` من اللعبة عند التصادم
د) يُرجع عدد الـ`Sprites` المتصادمة

**الإجابة الصحيحة: ب**
**التعليل:** `True` الثالث يعني `dokill=True` — يحذف الـ`Sprite` المتصادم من المجموعة. تُرجع قائمة الكائنات المتصادمة. (أ) ناقص: يُزيل أيضاً. (ج) لا يُزيل `player`. (د) يُرجع قائمة لا عدداً.

---

### السؤال 7 (صعب)
ما الفرق في سلوك هذين الكودين؟

```python
# Code A
if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
    is_blue = not is_blue

# Code B
pressed = pygame.key.get_pressed()
if pressed[pygame.K_SPACE]:
    is_blue = not is_blue
```

أ) كلاهما يُبدّل اللون مرة واحدة عند كل ضغطة
ب) `A` يُبدّل مرة واحدة، `B` يُبدّل بسرعة مستمرة طالما `SPACE` مضغوطة
ج) `B` يُبدّل مرة واحدة، `A` يُبدّل بشكل مستمر
د) لا فرق في النتيجة النهائية

**الإجابة الصحيحة: ب**
**التعليل:** `A` يعتمد على حدث `KEYDOWN` الذي يُطلق مرة واحدة. `B` يُقرأ في كل إطار ويُبدّل اللون بمعدل `FPS` مرة في الثانية طالما المفتاح مضغوط — ما يجعل اللون يرفّ بسرعة.

---

### السؤال 8 (متوسط)
لتوسيط نص أفقياً في شاشة عرضها 640، ما الإحداثي الصحيح لـ`x` إذا كان عرض النص 200؟

أ) `320`
ب) `220`
ج) `440`
د) `0`

**الإجابة الصحيحة: ب**
**التعليل:** `x = screen_width//2 - text_width//2 = 640//2 - 200//2 = 320 - 100 = 220`. `blit` يضع الزاوية العليا اليسرى عند `x=220`، مما يجعل مركز النص عند `220+100=320` (منتصف الشاشة). (أ) سيضع اليسار عند المنتصف. (ج) خاطئ رياضياً.

---

### السؤال 9 (صعب)
في حلقة اللعبة، ماذا سيحدث إذا نسي المبرمج `pygame.display.flip()`؟

أ) البرنامج سيُغلق تلقائياً
ب) الشاشة ستظل سوداء أو ستُظهر إطاراً قديماً ثابتاً
ج) سيُرمى `AttributeError`
د) اللعبة ستعمل لكن بـ`FPS` منخفض

**الإجابة الصحيحة: ب**
**التعليل:** `flip()` ينقل الـ`back buffer` للشاشة. بدونه تظل التغييرات في الذاكرة فقط ولا تظهر. (أ) البرنامج لا يُغلق. (ج) لا يُرمى استثناء. (د) المشكلة ليست `FPS` — المشكلة عدم العرض.

---

### السؤال 10 (متوسط)
أي من التالي صحيح بشأن `pygame.Rect`؟

أ) تعديل خاصية `center` يُغيّر حجم المستطيل
ب) `rect.move(5, 0)` يُعدّل المستطيل الأصلي في الموضع
ج) تعديل `width` أو `height` يغيّر الحجم، بينما باقي الخصائص تُحرّك بدون تغيير الحجم
د) `Rect` يُخزّن ثلاثة قيم فقط: `x`، `y`، `size`

**الإجابة الصحيحة: ج**
**التعليل:** هذا ما نصّت عليه المحاضرة حرفياً. (أ) خاطئ: `center` يُحرّك المستطيل لا يُغيّر حجمه. (ب) خاطئ: `move()` يُرجع نسخة جديدة. (د) خاطئ: `Rect` يُخزّن `x, y, w, h` وعشرات الخصائص الافتراضية.

---

### السؤال 11 (صعب)
في كود P_2_0.py، ما قيمة `catx` بعد 10 إطارات إذا بدأ `direction = 'right'` و`catx = 10`؟

أ) `60`
ب) `50`
ج) `10`
د) `55`

**الإجابة الصحيحة: أ**
**التعليل:** في كل إطار عند `direction='right'`، يُضاف 5 إلى `catx`. بعد 10 إطارات: `catx = 10 + (5 × 10) = 60`. الحدّ `catx==280` لم يُصل بعد.

---

### السؤال 12 (متوسط)
ما وظيفة `pygame.time.set_timer(EVENT, 1000)` في لعبة السيارات؟

أ) يُوقف اللعبة كل 1000 ثانية
ب) يُطلق الحدث `EVENT` كل 1000 ملي ثانية (كل ثانية)
ج) يُحدد الـ`FPS` بـ 1000
د) يُنشئ حدثاً يُطلق مرة واحدة فقط بعد 1000 ملي ثانية

**الإجابة الصحيحة: ب**
**التعليل:** `set_timer` يُكرّر الحدث كل `N` ملي ثانية حتى يُلغى. في لعبة السيارات، `INC_SPEED` يُطلق كل ثانية لزيادة `SPEED += 0.5`. (أ) ثواني لا ملي ثانية. (ج) لا علاقة بـ`FPS`. (د) يتكرر لا يُطلق مرة واحدة.

---

### السؤال 13 (صعب)
ما الفرق بين `Pyglet` و`Pygame` من ناحية دعم ثلاثي الأبعاد؟

أ) كلاهما يدعم 3D بطريقة مختلفة
ب) `Pygame` يدعم 3D عبر `OpenGL`، `Pyglet` لا يدعمه
ج) `Pyglet` مدمج مع `OpenGL` ويدعم 3D، بينما `Pygame` للألعاب ثنائية الأبعاد فقط
د) لا أيٌّ منهما يدعم 3D

**الإجابة الصحيحة: ج**
**التعليل:** نصّت المحاضرة على أن `Pyglet` مدمج مع `OpenGL` مما يُتيح الرسم ثلاثي الأبعاد. `Pygame` مخصص للألعاب 2D. (أ) و(ب) معكوسان. (د) خاطئ.

---

### السؤال 14 (متوسط)
لماذا يُستدعى `pygame.sprite.Sprite.__init__(self)` داخل `__init__` للكلاس المخصص؟

أ) لتهيئة خصائص `x` و`y`
ب) لأن `Python` تُلزم باستدعاء `__init__` الأصل في كل وراثة
ج) لتهيئة البنى الداخلية لـ`Sprite` (مثل قوائم المجموعات) التي تعتمد عليها `SpriteGroup`
د) لتحديد لون الـ`Sprite` الافتراضي

**الإجابة الصحيحة: ج**
**التعليل:** `pygame.sprite.Sprite.__init__` يُنشئ هياكل البيانات الداخلية التي تستخدمها `SpriteGroup` و`spritecollide`. بدونها ستفشل العمليات الجماعية. (أ) ليس وظيفته. (ب) ليس ملزماً في كل الحالات لكنه ضروري هنا لسبب محدد. (د) لا.

---

### السؤال 15 (صعب)
في `draw.arc(screen, color, rect, 0, pi/2, 5)` — في أي اتجاه يُرسم القوس؟

أ) باتجاه عقارب الساعة
ب) عكس عقارب الساعة (counter-clockwise)
ج) حسب اتجاه المستطيل `rect`
د) لا قوس يُرسم (الزاويتان متساويتان ناقصاً `pi/2`)

**الإجابة الصحيحة: ب**
**التعليل:** المحاضرة نصّت: إذا `start_angle < stop_angle` (هنا `0 < pi/2`) فالقوس يُرسم عكس عقارب الساعة. (أ) يحدث عند `start > stop`. (ج) الاتجاه لا يتعلق بـ`rect`. (د) خاطئ: `0 ≠ pi/2`.

---

### السؤال 16 (صعب)
ما الناتج عند تنفيذ `pygame.draw.polygon(screen, RED, [[0,0],[10,10]], 5)`؟

أ) خط مستقيم أحمر بسُمك 5
ب) مثلث أحمر
ج) `ValueError` لأن النقاط أقل من 3
د) لا شيء يُرسم

**الإجابة الصحيحة: ج**
**التعليل:** المحاضرة نصّت: "If len(points) < 3 ... it will raise the Value Error". نقطتان فقط لا تكفيان لمضلع. (أ) `draw.line` للخطوط. (ب) يحتاج 3 نقاط. (د) يُرمى خطأ لا صمت.

---

## الجزء الثاني: ملخص — السيناريوهات المركّبة

### السيناريو 1: تحليل كود `P_8.py`

> ```python
> player.rect.x += player.vx * [-1, 1][i]
> ```
> `i` يأخذ قيمتَي `0` و`1` في حلقة `range(2)`. `player.vx = 5`. المفاتيح: `[K_LEFT, K_RIGHT, K_UP, K_DOWN]`.

### السؤال 1.1 (صعب)
ماذا يحدث عند `i=0` ومفتاح `K_LEFT` مضغوطاً؟

أ) `player.rect.x += 5`
ب) `player.rect.x -= 5`
ج) `player.rect.x += 0`
د) `player.rect.y -= 5`

**الإجابة الصحيحة: ب**
**التعليل:** `[-1, 1][0]` = `-1`. إذن `player.rect.x += 5 * (-1) = -5` أي `player.rect.x -= 5` (حركة يسار).

### السؤال 1.2 (صعب)
ماذا يمثّل `player.move[2:4]` في الكود؟

أ) `[K_LEFT, K_RIGHT]`
ب) `[K_UP, K_DOWN]`
ج) `[K_RIGHT, K_UP]`
د) قائمة فارغة

**الإجابة الصحيحة: ب**
**التعليل:** `player.move = [K_LEFT, K_RIGHT, K_UP, K_DOWN]`. `player.move[2:4]` = `[K_UP, K_DOWN]` (العنصران عند الفهرسين 2 و3).

### السؤال 1.3 (صعب)
ما الذي يُغيّر في اللاعب عند التصادم مع الجدار؟

أ) يُزال اللاعب من الشاشة
ب) يتحول لون اللاعب للأبيض
ج) يتوقف اللاعب عن الحركة
د) تظهر رسالة "Game Over"

**الإجابة الصحيحة: ب**
**التعليل:** `if hit: player.image.fill((255, 255, 255))` — يملأ صورة اللاعب باللون الأبيض.

---

### السيناريو 2: تحليل لعبة السيارات

> الكود يستخدم `INC_SPEED = pygame.USEREVENT + 1` مع `pygame.time.set_timer(INC_SPEED, 1000)`.

### السؤال 2.1 (صعب)
لماذا يُستخدم `pygame.USEREVENT + 1` بدلاً من رقم عشوائي مثل `100`؟

أ) لأن `100` قيمة محجوزة لـ`pygame`
ب) لأن `USEREVENT` يبدأ من أعلى الأرقام المحجوزة لـ`pygame`، مما يضمن عدم التعارض مع الأحداث الداخلية
ج) لأن الأرقام الأقل من `USEREVENT` مهجورة
د) لا فرق — يمكن استخدام أي رقم

**الإجابة الصحيحة: ب**
**التعليل:** `pygame` يحجز أرقاماً للأحداث الداخلية (0 إلى `USEREVENT-1`). استخدام `USEREVENT+N` يضمن أن الحدث المخصص لا يتعارض مع `QUIT`، `KEYDOWN`، إلخ.

### السؤال 2.2 (متوسط)
ما نوع المتغير `SPEED` في لعبة السيارات بعد عدة ثوانٍ من البدء؟

أ) `int`
ب) `float`
ج) `str`
د) `bool`

**الإجابة الصحيحة: ب**
**التعليل:** `SPEED` يبدأ كـ`int = 5`، ثم `SPEED += 0.5` يحوّله لـ`float = 5.5`، `6.0`، إلخ.

---

### السيناريو 3: تحليل كود الرسم

> ```python
> pygame.draw.arc(screen, (0, 0, 255), [210, 175, 150, 125], pi/2, 0, 5)
> ```

### السؤال 3.1 (صعب)
ما الذي سيحدث في هذا الكود (start_angle = pi/2، stop_angle = 0)؟

أ) قوس يُرسم من 0 إلى pi/2 عكس عقارب الساعة
ب) قوس يُرسم باتجاه عقارب الساعة لأن start > stop
ج) لا شيء يُرسم (start == stop)
د) `ValueError` لأن `stop < start`

**الإجابة الصحيحة: ب**
**التعليل:** المحاضرة: "If start_angle > stop_angle then tau (2*pi) will be added to the stop angle" — هذا يُوضّح كيفية الرسم بالاتجاه الآخر.

### السؤال 3.2 (متوسط)
ما الجزء من القوس الذي يُرسم بـ `arc(screen, color, rect, 0, pi/2)`؟

أ) ربع دائرة كامل (90 درجة)
ب) نصف دائرة (180 درجة)
ج) دائرة كاملة (360 درجة)
د) ثلاثة أرباع دائرة (270 درجة)

**الإجابة الصحيحة: أ**
**التعليل:** `pi/2 - 0 = pi/2` راديان = 90 درجة = ربع دائرة.

---

## الجزء الثالث: أسئلة تصحيح الكود

### سؤال تصحيح 1 (logic)

**الكود (يحتوي خطأ):**
```python
import pygame
pygame.init()
screen = pygame.display.set_mode((400, 300))
done = False

while not done:
    if event.type == pygame.QUIT:
        done = True
    pygame.display.flip()

pygame.quit()
```
**اكتشف الخطأ:** `event` مستخدم قبل تعريفه — لا يوجد `for event in pygame.event.get()`.

**التصحيح:**
```python
import pygame

pygame.init()
screen = pygame.display.set_mode((400, 300))
done = False

while not done:
    for event in pygame.event.get():  # FIX: Process event queue first
        if event.type == pygame.QUIT:
            done = True
    pygame.display.flip()

pygame.quit()
```
**شرح الحل:**
1. بدون `pygame.event.get()` لا تُملأ قائمة الأحداث ولا يُعرَّف `event`.
2. الكود يُرمى `NameError: name 'event' is not defined`.
3. الحل: لفّ الفحص بـ`for event in pygame.event.get():`.

---

### سؤال تصحيح 2 (misconception)

**الكود (يحتوي خطأ):**
```python
class Player(pygame.sprite.Sprite):
    def __init__(self):
        self.image = pygame.Surface([30, 30])
        self.image.fill((0, 128, 255))
        self.rect = self.image.get_rect()
        self.rect.center = (150, 200)
```
**اكتشف الخطأ:** لم يُستدعَ `pygame.sprite.Sprite.__init__(self)` — البنى الداخلية لـ`Sprite` غير مُهيَّأة.

**التصحيح:**
```python
class Player(pygame.sprite.Sprite):
    def __init__(self):
        pygame.sprite.Sprite.__init__(self)  # FIX: Initialize parent class
        self.image = pygame.Surface([30, 30])
        self.image.fill((0, 128, 255))
        self.rect = self.image.get_rect()
        self.rect.center = (150, 200)
```
**شرح الحل:**
1. بدون تهيئة الأصل، `SpriteGroup.add()` و`spritecollide()` ستفشل.
2. قد تظهر `AttributeError` عند استخدام `player_group.draw(screen)`.
3. قاعدة: **دائماً** أول سطر في `__init__` المخصص هو تهيئة الأصل.

---

### سؤال تصحيح 3 (return_check)

**الكود (يحتوي خطأ):**
```python
my_rect = pygame.Rect(10, 10, 50, 50)
my_rect.move(5, 0)  # Trying to move the rectangle 5 pixels right
print(my_rect.x)    # Expected: 15
```
**اكتشف الخطأ:** `rect.move()` يُرجع نسخة جديدة ولا يُعدّل الأصل — النتيجة المطبوعة ستكون `10` لا `15`.

**التصحيح:**
```python
my_rect = pygame.Rect(10, 10, 50, 50)
my_rect = my_rect.move(5, 0)  # FIX: Assign the returned new Rect
print(my_rect.x)               # Now: 15
```
**شرح الحل:**
1. `move()` كما `rect()` يُرجع نسخة جديدة — القيمة المُرجَعة يجب إسنادها.
2. بديل: استخدام `move_ip(5, 0)` الذي يُعدّل الأصل مباشرةً (in-place).
3. قاعدة: أي دالة `Rect` تنتهي بـ`_ip` تعدّل الأصل، بدونها تُرجع نسخة.

---

### سؤال تصحيح 4 (logic)

**الكود (يحتوي خطأ):**
```python
import pygame
pygame.init()
screen = pygame.display.set_mode((400, 300))
font = pygame.font.SysFont("Arial", 36)
text = font.render("Score: 100", True, (255, 0, 0))
done = False

while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True
    screen.blit(text, (100, 100))
    # Missing flip/update!
pygame.quit()
```
**اكتشف الخطأ:** لا يوجد `pygame.display.flip()` أو `pygame.display.update()` — النص لن يظهر على الشاشة.

**التصحيح:**
```python
import pygame
pygame.init()
screen = pygame.display.set_mode((400, 300))
font = pygame.font.SysFont("Arial", 36)
text = font.render("Score: 100", True, (255, 0, 0))
done = False

while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True
    screen.blit(text, (100, 100))
    pygame.display.flip()  # FIX: Update the screen

pygame.quit()
```
**شرح الحل:**
1. `blit` يرسم على الـ`back buffer` في الذاكرة.
2. بدون `flip()`، التغييرات لا تنتقل للشاشة الحقيقية.
3. يجب استدعاء `flip()` أو `update()` في نهاية كل إطار.

---

### سؤال تصحيح 5 (dead_code)

**الكود (يحتوي خطأ):**
```python
import pygame, sys
pygame.init()
screen = pygame.display.set_mode((300, 300))

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit

pygame.display.flip()  # This line is never reached
```
**اكتشف الخطأ:** `sys.exit` بدون `()` لا يُنفَّذ (مرجع للدالة لا استدعاء). `pygame.display.flip()` خارج الحلقة لن يُنفَّذ أبداً.

**التصحيح:**
```python
import pygame, sys
pygame.init()
screen = pygame.display.set_mode((300, 300))

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()  # FIX: Call sys.exit() with parentheses

    pygame.display.flip()  # FIX: Move inside the loop

```
**شرح الحل:**
1. `sys.exit` وحدها مجرد مرجع للدالة — لا تُنهي البرنامج.
2. `sys.exit()` تُرمى `SystemExit` وتُوقف البرنامج.
3. `pygame.display.flip()` يجب أن يكون داخل حلقة اللعبة.

---

## الجزء الثالث: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### تمرين 1 (تمرين إضافي): إنشاء نافذة مخصصة — fill_gaps

**السيناريو / المطلوب:**
أكمل الكود لإنشاء نافذة `pygame` بعنوان "My Game" وخلفية زرقاء فاتحة (`173, 216, 230`).

```python
import pygame

pygame.______()  # (1)
screen = pygame.display.______((500, 400))  # (2)
pygame.display.set_caption('______')  # (3)
done = False

while not done:
    for event in pygame.event.get():
        if event.type == pygame.______:  # (4)
            done = True
    screen.fill((______))  # (5) Light blue
    pygame.display.______()  # (6)

pygame.quit()
```

**المطلوب:**
1. أكمل الفراغات (1) إلى (6).

**نموذج الحل:**
```python
import pygame

pygame.init()  # (1)
screen = pygame.display.set_mode((500, 400))  # (2)
pygame.display.set_caption('My Game')  # (3)
done = False

while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:  # (4)
            done = True
    screen.fill((173, 216, 230))  # (5)
    pygame.display.flip()  # (6)

pygame.quit()
```

---

### تمرين 2 (تمرين إضافي): تحريك دائرة — code_fix

**السيناريو / المطلوب:**
الكود التالي يُفترض أن يرسم دائرة تتحرك للأسفل وتعود للأعلى عند وصول الحد. اكتشف الخطأ وصحّحه.

```python
import pygame
pygame.init()
screen = pygame.display.set_mode((400, 400))
y = 0
speed = 3
going_down = True

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()

    if going_down:
        y += speed
        if y >= 380:
            going_down = False
    else:
        y -= speed
        if y <= 0:
            going_down = True

    pygame.draw.circle(screen, (255, 0, 0), (200, y), 20)
    pygame.display.flip()
```

**المطلوب:**
1. ما المشكلة في الكود؟
2. صحّح الكود.

**نموذج الحل:**
- **المشكلة:** لا يوجد `screen.fill()` في بداية كل إطار — الدوائر السابقة تتراكم وتترك أثراً.

```python
import pygame
pygame.init()
screen = pygame.display.set_mode((400, 400))
y = 0
speed = 3
going_down = True

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()

    screen.fill((0, 0, 0))  # FIX: Clear screen before drawing

    if going_down:
        y += speed
        if y >= 380:
            going_down = False
    else:
        y -= speed
        if y <= 0:
            going_down = True

    pygame.draw.circle(screen, (255, 0, 0), (200, y), 20)
    pygame.display.flip()
```

---

### تمرين 3 (تمرين إضافي): رسم علم — scenario

**السيناريو / المطلوب:**
اكتب كوداً يرسم مستطيلات ملونة تُمثّل علم دولة عربية مؤلّف من 3 ألوان أفقية (مثلاً: أحمر، أبيض، أسود).

**المطلوب:**
1. إنشاء نافذة 300 × 200.
2. رسم 3 مستطيلات ملونة.
3. النوافذ تظل مفتوحة حتى الإغلاق.

**نموذج الحل:**
```python
import pygame

pygame.init()
screen = pygame.display.set_mode((300, 200))
pygame.display.set_caption("Flag")
done = False

while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True

    # Red stripe (top third)
    pygame.draw.rect(screen, (206, 17, 38), pygame.Rect(0, 0, 300, 67))
    # White stripe (middle third)
    pygame.draw.rect(screen, (255, 255, 255), pygame.Rect(0, 67, 300, 66))
    # Black stripe (bottom third)
    pygame.draw.rect(screen, (0, 0, 0), pygame.Rect(0, 133, 300, 67))

    pygame.display.flip()

pygame.quit()
```

---

### تمرين 4 (تمرين إضافي): `Sprite` متحرك — scenario

**السيناريو / المطلوب:**
أضف دالة `update()` لكلاس `Ball` تجعل الكرة ترتدّ عن حدود الشاشة (400×400).

**نموذج الحل:**
```python
import pygame

pygame.init()
screen = pygame.display.set_mode((400, 400))
clock = pygame.time.Clock()

class Ball(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface([20, 20], pygame.SRCALPHA)  # Transparent
        pygame.draw.circle(self.image, (255, 165, 0), (10, 10), 10)  # Orange circle
        self.rect = self.image.get_rect(center=(200, 200))
        self.vx = 4  # Horizontal velocity
        self.vy = 3  # Vertical velocity

    def update(self):
        self.rect.x += self.vx  # Move horizontally
        self.rect.y += self.vy  # Move vertically
        # Bounce off left/right walls
        if self.rect.left < 0 or self.rect.right > 400:
            self.vx = -self.vx
        # Bounce off top/bottom walls
        if self.rect.top < 0 or self.rect.bottom > 400:
            self.vy = -self.vy

ball = Ball()
all_sprites = pygame.sprite.Group()
all_sprites.add(ball)
done = False

while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True
    screen.fill((30, 30, 30))  # Dark background
    all_sprites.update()       # Call update() on all sprites
    all_sprites.draw(screen)   # Draw all sprites
    pygame.display.flip()
    clock.tick(60)

pygame.quit()
```

---

### تمرين 5 (تمرين إضافي): نقاط اللعبة — fill_gaps

**السيناريو / المطلوب:**
أكمل الكود لعرض عداد نقاط يزيد بـ1 كل ثانية.

```python
import pygame, time

pygame.init()
screen = pygame.display.set_mode((300, 200))
font = pygame.font.SysFont("Verdana", 40)
score = 0
last_time = time.time()
done = False

while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True

    current_time = ______  # (1) Get current time
    if current_time - last_time >= ______:  # (2) Check if 1 second passed
        score += ______  # (3) Increase score
        last_time = ______  # (4) Reset timer

    screen.fill((0, 0, 0))
    score_text = font.render(f"Score: {______}", True, (255, 255, 0))  # (5)
    screen.blit(score_text, (50, 80))
    pygame.display.flip()

pygame.quit()
```

**نموذج الحل:**
```python
current_time = time.time()  # (1)
if current_time - last_time >= 1.0:  # (2)
    score += 1  # (3)
    last_time = current_time  # (4)
score_text = font.render(f"Score: {score}", True, (255, 255, 0))  # (5)
```

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

### تمرين 1: تحليل بنية لعبة كاملة — written_analysis

**السيناريو:**
لعبة تحتوي على لاعب يتحرك بالأسهم، أعداء يهبطون عشوائياً، ويزداد عددهم كل 10 ثوانٍ.

**المطلوب:**
1. حدّد المكوّنات الرئيسية التي يحتاجها المبرمج.
2. رتّب ترتيب التنفيذ في `__init__` و`while` loop.

**نموذج الحل:**

| المكوّن | النوع | الوظيفة |
| --- | --- | --- |
| `Player` class | `Sprite` | يتحرك بالأسهم |
| `Enemy` class | `Sprite` | يهبط من الأعلى |
| `player_group` | `SpriteGroup` | لرسم اللاعب |
| `enemy_group` | `SpriteGroup` | للتصادم والرسم |
| `SPAWN_EVENT` | `USEREVENT` | لإضافة عدو جديد |
| `clock.tick(60)` | FPS control | للسرعة المنتظمة |

---

### تمرين 2: إكمال جدول قرار — table_fill

**السيناريو:**
يجب اتخاذ قرارات في لعبة بناءً على حالة الكائنات.

**المطلوب:** أكمل جدول القرار.

| الحالة | القرار الصحيح | الدالة المستخدمة |
| --- | --- | --- |
| الكائن خرج من حدود الشاشة | إعادته للموضع الابتدائي | `self.rect.top = 0` |
| اللاعب يلمس العدو | عرض "Game Over" | ؟ |
| المفتاح `SPACE` مضغوط | تبديل الحالة | ؟ |
| كل ثانية | زيادة سرعة العدو | ؟ |

**نموذج الحل:**

| الحالة | القرار الصحيح | الدالة المستخدمة |
| --- | --- | --- |
| الكائن خرج من حدود الشاشة | إعادته للموضع الابتدائي | `self.rect.top = 0` |
| اللاعب يلمس العدو | عرض "Game Over" | `pygame.sprite.spritecollideany(player, enemies)` |
| المفتاح `SPACE` مضغوط | تبديل الحالة | `event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE` |
| كل ثانية | زيادة سرعة العدو | `pygame.time.set_timer(EVENT, 1000)` |

---

### تمرين 3: تصميم `Sprite` — case_study

**السيناريو:**
تريد إنشاء `Sprite` لصاروخ في لعبة فضاء. يتحرك للأعلى وإذا خرج من الشاشة يختفي.

**المطلوب:**
1. اكتب كلاس `Rocket` كامل.

**نموذج الحل:**
```python
class Rocket(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.Surface([10, 30])   # Tall thin rocket
        self.image.fill((255, 100, 0))           # Orange color
        self.rect = self.image.get_rect()
        self.rect.center = (x, y)
        self.speed = 7  # Moves upward quickly

    def update(self):
        self.rect.y -= self.speed  # Move upward (y decreases)
        if self.rect.bottom < 0:   # Off screen at top
            self.kill()             # Remove from all groups
```

---

### تمرين 4: تحليل الـ`Game Loop` — diagram_completion

**المطلوب:**
رتّب الخطوات التالية بالترتيب الصحيح لحلقة لعبة `Pygame`:

- `pygame.display.flip()`
- `screen.fill((0,0,0))`
- `for event in pygame.event.get():`
- `all_sprites.update()`
- `all_sprites.draw(screen)`
- `clock.tick(60)`

**نموذج الحل:**
```algorithm
1 | for event in pygame.event.get()  | event module   | معالجة أحداث المستخدم
2 | all_sprites.update()             | SpriteGroup    | تحديث مواضع جميع الكائنات
3 | screen.fill((0,0,0))             | Surface method | مسح الشاشة
4 | all_sprites.draw(screen)         | SpriteGroup    | رسم جميع الكائنات
5 | pygame.display.flip()            | display module | عرض الإطار
6 | clock.tick(60)                   | Clock method   | التحكم في FPS
```

---

## الجزء الخامس: تمارين تتبع التنفيذ

### تمرين تتبع 1: تحريك الصورة في P_2_0.py

**المدخل:**
```python
catx = 10
caty = 10
direction = 'right'
# Running 4 frames, each frame moves 5 pixels
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| الإطار | الشرط المتحقق | `catx` | `caty` | `direction` الجديد |
| --- | --- | --- | --- | --- |
| 1 | `direction == 'right'` | ؟ | 10 | ؟ |
| 2 | `direction == 'right'` | ؟ | 10 | ؟ |
| 3 | `catx == 280` متحقق (افترض) | 280 | 10 | ؟ |
| 4 | `direction == 'down'` | 280 | ؟ | ؟ |

**نموذج الحل:**

| الإطار | الشرط المتحقق | `catx` | `caty` | `direction` الجديد |
| --- | --- | --- | --- | --- |
| 1 | `direction == 'right'` | 15 | 10 | `'right'` |
| 2 | `direction == 'right'` | 20 | 10 | `'right'` |
| 3 | `catx == 280` | 280 | 10 | `'down'` |
| 4 | `direction == 'down'` | 280 | 15 | `'down'` |

**النتيجة:** الصورة تتحرك يميناً حتى `catx=280` ثم تبدأ التحرك للأسفل.

**سؤال MCQ على التتبع:**
ماذا ستكون قيمة `direction` في الإطار 3؟
أ) `'right'` ب) `'down'` ج) `'left'` د) `'up'`
**الإجابة: ب** — لأن `catx == 280` يُشغّل `direction = 'down'`.

---

### تمرين تتبع 2: قيمة `SPEED` في لعبة السيارات

**المدخل:**
```python
SPEED = 5
# Event INC_SPEED fires every 1 second
# Run for 4 seconds
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| الثانية | الحدث | قيمة `SPEED` قبل | قيمة `SPEED` بعد |
| --- | --- | --- | --- |
| 1 | `INC_SPEED` | 5 | ؟ |
| 2 | `INC_SPEED` | ؟ | ؟ |
| 3 | `INC_SPEED` | ؟ | ؟ |
| 4 | `INC_SPEED` | ؟ | ؟ |

**نموذج الحل:**

| الثانية | الحدث | قيمة `SPEED` قبل | قيمة `SPEED` بعد |
| --- | --- | --- | --- |
| 1 | `INC_SPEED` | 5.0 | 5.5 |
| 2 | `INC_SPEED` | 5.5 | 6.0 |
| 3 | `INC_SPEED` | 6.0 | 6.5 |
| 4 | `INC_SPEED` | 6.5 | 7.0 |

**النتيجة:** بعد 4 ثوانٍ `SPEED = 7.0`.

---

### تمرين تتبع 3: اكتشاف التصادم

**المدخل:**
```python
player.rect = pygame.Rect(100, 100, 20, 20)  # Player at (100,100) size 20x20
wall.rect   = pygame.Rect(110, 110, 20, 20)  # Wall at (110,110) size 20x20
# Check: spritecollide(player, wall_group, True)
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| الخطوة | العملية | النتيجة |
| --- | --- | --- |
| 1 | هل `player.rect` يتداخل مع `wall.rect`؟ | ؟ (نعم/لا) |
| 2 | ماذا تُرجع `spritecollide`؟ | ؟ |
| 3 | هل يُحذف `wall` من `wall_group`؟ (`True`) | ؟ |
| 4 | ماذا يحدث لـ`player.image`؟ | ؟ |

**نموذج الحل:**

| الخطوة | العملية | النتيجة |
| --- | --- | --- |
| 1 | هل `player.rect` يتداخل مع `wall.rect`؟ | نعم (تتداخل في منطقة (110-120, 110-120)) |
| 2 | ماذا تُرجع `spritecollide`؟ | `[wall]` — قائمة تحتوي على `wall` |
| 3 | هل يُحذف `wall` من `wall_group`؟ | نعم — `dokill=True` |
| 4 | ماذا يحدث لـ`player.image`؟ | `player.image.fill((255,255,255))` — يصبح أبيض |

**النتيجة:** التصادم يُحذف الجدار ويحوّل اللاعب للأبيض.

---

## الجزء الخامس: أسئلة تصميم

### سؤال تصميم 1: تصميم بنية لعبة `Pygame` كاملة

**المطلوب:**
صمّم بنية كلاسات (`UML`) للعبة `Space Shooter` تحتوي على: لاعب، رصاصات، أعداء، شاشة `Game Over`.

**نموذج الإجابة:**

#### 📊 المخطط: UML — Space Shooter

#### ما هذا المخطط؟
> يوضّح التسلسل الهرمي للكلاسات والعلاقات بين مكوّنات اللعبة.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | `pygame.sprite.Sprite` | class | الكلاس الأصل |
| 2 | `Player` | class | يرث من `Sprite` |
| 3 | `Bullet` | class | يرث من `Sprite` |
| 4 | `Enemy` | class | يرث من `Sprite` |
| 5 | `GameManager` | class | يُدير الحلقة والمجموعات |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| `Player` | `Sprite` | يرث | ← | وراثة |
| `Bullet` | `Sprite` | يرث | ← | وراثة |
| `Enemy` | `Sprite` | يرث | ← | وراثة |
| `GameManager` | `Player` | يُنشئ | → | تجميع |
| `GameManager` | `Enemy` | يُنشئ | → | تجميع |
| `Player` | `Bullet` | يُطلق | → | ارتباط |

```diagram
type: class
title: Space Shooter UML
direction: TD
nodes:
  - id: sprite
    label: pygame.sprite.Sprite
    kind: process
    level: 0
  - id: player
    label: Player\n- image\n- rect\n- move()
    kind: process
    level: 1
  - id: bullet
    label: Bullet\n- image\n- rect\n- update()
    kind: process
    level: 1
  - id: enemy
    label: Enemy\n- image\n- rect\n- move()
    kind: process
    level: 1
  - id: manager
    label: GameManager\n- game_loop()\n- check_collision()
    kind: event
    level: 2
edges:
  - from: player
    to: sprite
    label: inherits
  - from: bullet
    to: sprite
    label: inherits
  - from: enemy
    to: sprite
    label: inherits
  - from: manager
    to: player
    label: creates
  - from: manager
    to: enemy
    label: creates
  - from: player
    to: bullet
    label: fires
```

**معايير التقييم:**
- وراثة صحيحة من `pygame.sprite.Sprite`.
- وجود `self.image` و`self.rect` في كل كلاس.
- دالة `move()` أو `update()` في كل كلاس متحرك.
- فصل منطق اللعبة في `GameManager`.

---

### سؤال تصميم 2: مخطط تدفق لعبة السيارات

**المطلوب:**
ارسم مخطط تدفق (`flowchart`) يُظهر منطق `while loop` في لعبة السيارات من اكتشاف التصادم حتى نهاية اللعبة.

**نموذج الإجابة:**

#### 📊 المخطط: تدفق لعبة السيارات

#### ما هذا المخطط؟
> يُظهر قرارات الحلقة الرئيسية من بدء الإطار حتى نهاية اللعبة.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Start Frame | event | بداية كل إطار |
| 2 | Handle Events | process | معالجة الأحداث |
| 3 | INC_SPEED? | process | هل حدث زيادة السرعة؟ |
| 4 | SPEED += 0.5 | process | زيادة السرعة |
| 5 | Move Sprites | process | تحريك الكائنات |
| 6 | Collision? | process | هل حدث تصادم؟ |
| 7 | Game Over | event | نهاية اللعبة |
| 8 | Draw & Update | process | رسم وتحديث الشاشة |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Start Frame | Handle Events | → | → | أول خطوة |
| Handle Events | INC_SPEED? | → | → | فحص نوع الحدث |
| INC_SPEED? | SPEED += 0.5 | نعم | → | |
| INC_SPEED? | Move Sprites | لا | → | |
| SPEED += 0.5 | Move Sprites | → | → | |
| Move Sprites | Collision? | → | → | |
| Collision? | Game Over | نعم | → | |
| Collision? | Draw & Update | لا | → | |
| Draw & Update | Start Frame | → | → | تكرار |

```diagram
type: flowchart
title: Car Game Loop
direction: TD
nodes:
  - id: start
    label: Start Frame
    kind: event
    level: 0
  - id: events
    label: Handle Events
    kind: process
    level: 1
  - id: speed_check
    label: INC_SPEED?
    kind: process
    level: 2
  - id: inc
    label: SPEED += 0.5
    kind: process
    level: 3
  - id: move
    label: Move Sprites
    kind: process
    level: 4
  - id: collision
    label: Collision?
    kind: process
    level: 5
  - id: gameover
    label: Game Over
    kind: event
    level: 6
  - id: draw
    label: Draw and Update
    kind: process
    level: 6
edges:
  - from: start
    to: events
    label: ""
  - from: events
    to: speed_check
    label: ""
  - from: speed_check
    to: inc
    label: "Yes"
  - from: speed_check
    to: move
    label: "No"
  - from: inc
    to: move
    label: ""
  - from: move
    to: collision
    label: ""
  - from: collision
    to: gameover
    label: "Yes"
  - from: collision
    to: draw
    label: "No"
  - from: draw
    to: start
    label: repeat
```

**معايير التقييم:**
- ترتيب صحيح للخطوات.
- حدث `INC_SPEED` ظاهر.
- اكتشاف التصادم يؤدي إلى "Game Over".
- الحلقة تعود لنفسها عند عدم التصادم.

---

## الجزء السادس: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما الدالة التي تُهيّئ جميع `modules` في `pygame`؟
A: `pygame.init()` — يجب استدعاؤها قبل أي عملية أخرى.

**Q2:** ماذا يُرجع `pygame.display.set_mode((400, 300))`؟
A: كائن `Surface` يمثّل الشاشة المرئية للنافذة.

**Q3:** ما الغرض من `pygame.event.get()`؟
A: تُفرّغ قائمة الأحداث المعلّقة وتُرجعها — بدونها تتجمّد النافذة.

**Q4:** ما الفرق بين `KEYDOWN` و`key.get_pressed()`؟
A: `KEYDOWN` حدث لمرة واحدة عند الضغط. `get_pressed()` يُقرأ في كل إطار ويُعبّر عن الحالة الآنية.

**Q5:** لماذا يجب استدعاء `pygame.sprite.Sprite.__init__(self)` في الكلاس المخصص؟
A: لتهيئة البنى الداخلية التي تعتمد عليها `SpriteGroup` و`spritecollide`.

**Q6:** ماذا يفعل `pygame.display.flip()`؟
A: ينقل الإطار المرسوم من الـ`back buffer` إلى الشاشة الحقيقية.

**Q7:** ما المتغيران الإلزاميان في أي `Sprite` مخصص؟
A: `self.image` (كائن `Surface`) و`self.rect` (كائن `Rect`).

**Q8:** ما الذي يفعله المعامل الثالث `True` في `spritecollide(player, group, True)`؟
A: يحذف (`kill`) كل `Sprite` متصادم من المجموعة فور اكتشاف التصادم.

**Q9:** كيف تُحسب إحداثيات توسيط نص أفقياً في شاشة عرضها `W`؟
A: `x = W // 2 - text.get_width() // 2`

**Q10:** ما الدالة المستخدمة لإطلاق حدث مخصص بشكل دوري؟
A: `pygame.time.set_timer(EVENT, milliseconds)` — يُطلق `EVENT` كل `N` ملي ثانية.

**Q11:** ما قيمة `width` في `draw.rect()` التي تجعله ممتلئاً؟
A: `width=0` (الافتراضي) يرسم مستطيلاً ممتلئاً.

**Q12:** من كتب `Pygame` رسمياً ولماذا؟
A: كتبها **Pete Shinners** ليحلّ محلّ `PySDL`.

**Q13:** ما الفرق بين `pygame.display.flip()` و`pygame.display.update()`؟
A: `flip()` تُحدّث الشاشة كاملة، `update()` يمكن تمرير `Rect` لتحديث جزء فقط.

**Q14:** ما معنى `blit`؟
A: **Bl**ock **It**ransfer — نقل كتلة بكسل من `Surface` لآخر.

**Q15:** ما قيمة `FPS` المثلى للألعاب وفق المحاضرة؟
A: بين 30-60 FPS — 60 للناعم، أقل من 24 يُسبّب `stutter`، أكثر من 100 سريع جداً.

**Q16:** ما الذي يميّز `Pyglet` عن `Pygame`؟
A: `Pyglet` يدعم 3D عبر `OpenGL` ومكتوب بـ`pure Python`، لكنه أقل شعبية.

**Q17:** ما الفرق بين `spritecollide` و`spritecollideany`؟
A: `spritecollide` يُرجع قائمة بكل المتصادمين. `spritecollideany` يُرجع أول متصادم أو `None` — أسرع للتحقق البسيط.

**Q18:** كيف تضبط سرعة حلقة اللعبة على 60 إطار/ثانية؟
A: `clock = pygame.time.Clock()` ثم `clock.tick(60)` داخل الحلقة.

---

## الجزء السابع: أسئلة نظرية متوقعة بالامتحان

### سؤال 1: ما مفهوم `Game Loop`؟
**نموذج الإجابة:**
1. التعريف: حلقة `while` لا نهائية تُنفَّذ في كل إطار من إطارات اللعبة.
2. المكونات: Handle Events → Update State → Draw Screen → Flip Display → Control FPS.
3. مثال: `while not done: events → update → draw → flip`.
4. متى نستخدم: في كل برنامج `pygame` — إلزامي.

---

### سؤال 2: ما الفرق بين `Surface` و`Rect` في `pygame`؟
**نموذج الإجابة:**
1. التعريف: `Surface` هو لوح الرسم (بكسل وألوان)، `Rect` هو المستطيل الهندسي (إحداثيات وأبعاد).
2. المكونات: `Surface` يحتوي بيانات البكسل. `Rect` يحتوي `x, y, w, h` وخصائص مشتقة.
3. مثال: صورة محمّلة = `Surface`. إطار الصورة = `Rect`.
4. متى نستخدم: `Surface` للرسم، `Rect` للموضع والتصادم.

---

### سؤال 3: لماذا نستخدم `SpriteGroup` بدلاً من قائمة عادية؟
**نموذج الإجابة:**
1. التعريف: `SpriteGroup` مجموعة متخصصة تُدير `Sprites` وتوفّر عمليات جماعية.
2. المزايا: `group.draw(screen)` يرسم الكل. `group.update()` يُحدّث الكل. `spritecollide` تعمل مع المجموعات.
3. مثال: `all_sprites.draw(screen)` بدلاً من `for s in sprites: screen.blit(s.image, s.rect)`.
4. متى نستخدم: عندما يكون هناك أكثر من `Sprite` من نفس النوع.

---

### سؤال 4: ما هو `double buffering` ولماذا يستخدمه `pygame`؟
**نموذج الإجابة:**
1. التعريف: رسم الإطار كاملاً في الذاكرة (back buffer) ثم نقله للشاشة دفعة واحدة.
2. الغرض: منع الوميض (flickering) الذي يحدث عند الرسم المباشر على الشاشة.
3. مثال: `pygame.display.flip()` يُنجز عملية النقل.
4. متى نستخدم: في كل برنامج `pygame` تلقائياً.

---

### سؤال 5: كيف تعمل آلية اكتشاف التصادم في `pygame`؟
**نموذج الإجابة:**
1. التعريف: مقارنة `Rect` لكائنين لتحديد هل يتداخلان في أي نقطة.
2. الآلية: `pygame.sprite.spritecollide(sprite, group, dokill)` — يفحص كل عضو في المجموعة.
3. مثال: `hit = pygame.sprite.spritecollide(player, enemies, True)`.
4. متى نستخدم: في كل لعبة تحتوي تفاعلاً بين الكائنات.

---

### سؤال 6: ما الفرق بين `pygame.event.get()` و`pygame.event.wait()`؟
**نموذج الإجابة:**
1. `get()`: يُفرّغ قائمة الأحداث ويُرجع كل الأحداث فوراً (لا ينتظر).
2. `wait()`: يتوقف حتى يصل حدث واحد ثم يُرجعه — أكفأ للمشاهد الثابتة.
3. مثال: لعبة متحركة تستخدم `get()`. تطبيق انتظار مدخلات يستخدم `wait()`.
4. متى نستخدم: `get()` في معظم الألعاب، `wait()` في التطبيقات غير الحركية.

---

### سؤال 7: لماذا يُعدّ `FPS` مهماً في الألعاب؟
**نموذج الإجابة:**
1. التعريف: Frames Per Second — عدد الإطارات التي تُعرض في الثانية الواحدة.
2. الأهمية: يضبط سرعة اللعبة بغض النظر عن سرعة الجهاز، ويمنع استهلاك المعالج.
3. مثال: `clock.tick(60)` يضمن أقصاه 60 إطار/ثانية.
4. القيم: 24 للحد الأدنى، 60 للتجربة الناعمة، >100 مضيعة.

---

### سؤال 8: ما مكوّنات الـ`Sprite` المخصص الإلزامية؟
**نموذج الإجابة:**
1. `pygame.sprite.Sprite.__init__(self)` في `__init__`.
2. `self.image` — كائن `Surface` يُعرض على الشاشة.
3. `self.rect` — كائن `Rect` يحدد الموضع.
4. دالة `move()` أو `update()` للتحريك.

---

### سؤال 9: كيف يختلف `Pygame` عن `Pyglet`؟
**نموذج الإجابة:**
1. `Pygame`: شعبية أكبر، API أبسط، 2D فقط، يستخدم `C bindings`.
2. `Pyglet`: يدعم 3D عبر `OpenGL`، `pure Python`، مجتمع أصغر.
3. الاختيار: `Pygame` للألعاب 2D والتعليم، `Pyglet` لمشاريع 3D.

---

### سؤال 10: ما خطوات عرض نص في `pygame`؟
**نموذج الإجابة:**
```algorithm
1 | pygame.font.SysFont(name, size) | font module   | إنشاء كائن الخط
2 | font.render(text, AA, color)    | Font method   | تحويل النص إلى Surface
3 | screen.blit(text_surf, (x, y))  | Surface method | رسم السطح النصي على الشاشة
4 | pygame.display.flip()           | display module | تحديث الشاشة
```

---

## الجزء الثامن: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أعرف كيف أكتب الهيكل الأساسي لبرنامج `pygame` من الذاكرة
- [ ] أفهم لماذا `pygame.event.get()` إلزامي
- [ ] أعرف الفرق بين `KEYDOWN` event و`key.get_pressed()`
- [ ] أستطيع إنشاء `Sprite` مخصص بالخصائص الإلزامية
- [ ] أفهم ما هو `self.image` و`self.rect` ولماذا هما ضروريان
- [ ] أعرف كيف أستخدم `SpriteGroup` و`spritecollide`
- [ ] أستطيع رسم مستطيل، دائرة، خط، مضلع، وقوس
- [ ] أعرف الفرق بين `width=0` و`width>0` في دوال الرسم
- [ ] أفهم كيفية تحميل وعرض صورة على الشاشة
- [ ] أعرف كيف أعرض نصاً في مركز الشاشة
- [ ] أفهم مفهوم `FPS` وكيف أتحكم فيه
- [ ] أعرف كيف يعمل `pygame.time.set_timer()`
- [ ] أستطيع تحليل كود `Sprite` واستخراج مواضع الأخطاء
- [ ] أعرف الفرق بين `Pygame` و`Pyglet`
- [ ] أستطيع وصف `Game Loop` بخطواته الصحيحة
- [ ] أفهم لماذا `double buffering` يمنع `flickering`
- [ ] أعرف متى أستخدم `kill()` وما الذي يفعله
- [ ] أستطيع كتابة كلاس `Sprite` يرتدّ عن حدود الشاشة

---

## الجزء التاسع: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات

| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| OOP (كلاسات) | Game Programming | `Sprite` يرث من `pygame.sprite.Sprite` |
| حلقات وشروط | Game Loop | `while not done:` + `if event.type` |
| Matplotlib | pygame.draw | كلاهما رسم — مفاهيم متشابهة |
| Machine Learning | Panda3D/advanced | أدوات `Python` متشابهة |

---

### 🔑 أهم النقاط الذهبية

| الموضوع | النقاط |
| --- | --- |
| بنية كل برنامج | `init → set_mode → loop(events→update→draw→flip) → quit` |
| إلزاميات `Sprite` | `super().__init__()` + `self.image` + `self.rect` |
| مسح الشاشة | `screen.fill(bg)` أول شيء في كل إطار |
| التصادم | `spritecollide(sprite, group, dokill)` |
| النص | `font.render(text, AA, color)` → `blit` |
| الزمن | `clock = Clock()` → `clock.tick(FPS)` + `set_timer(EVENT, ms)` |

---

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `pygame.init()` | تهيئة المكتبة | بداية كل برنامج |
| `Surface` | لوح الرسم | كل عملية بصرية |
| `Rect` | مستطيل هندسي | مواضع، تصادم |
| `blit(src, pos)` | رسم سطح على سطح | الصور والنصوص |
| `flip()` | عرض الإطار | نهاية كل إطار |
| `KEYDOWN` | حدث ضغط مفتاح | مرة واحدة |
| `get_pressed()` | حالة المفاتيح الآن | حركة مستمرة |
| `spritecollide` | كشف التصادم | لعبة |
| `kill()` | إزالة `Sprite` | عند التصادم/الخروج |
| `clock.tick(N)` | ضبط FPS | نهاية الإطار |
| `set_timer(E, ms)` | حدث دوري | زيادة الصعوبة |
| `FPS = 60` | 60 إطار/ثانية | سرعة اللعبة |
| `USEREVENT + N` | حدث مخصص | بدون تعارض |

---

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | دائماً استدعِ `pygame.event.get()` في كل إطار — وإلا تتجمّد النافذة |
| 2 | دائماً `screen.fill(bg)` أول شيء في الإطار — وإلا تتراكم الصور |
| 3 | دائماً `pygame.display.flip()` آخر شيء في الإطار |
| 4 | دائماً `super().__init__()` أول شيء في `__init__` الـ`Sprite` المخصص |
| 5 | `rect.move()` لا يُعدّل الأصل — يجب إسناد النتيجة |
| 6 | `width=0` = ممتلئ، `width>0` = حافة فقط، `width<0` = لا شيء |
| 7 | للحركة المستمرة: `get_pressed()`. لحدث مرة واحدة: `KEYDOWN` event |
| 8 | `self.image` و`self.rect` إلزاميان في كل `Sprite` |

---

<!-- VALIDATION
schema: 1.0
parts: integration_map, detail, summary, mcq, debug, exercise, analysis_exercise, trace_exercise, design_question, qa_cards, theory, checklist, cheat_sheet
mcq_count: 16
code_blocks: 15
-->
