# المحاضرة 11 — Data Analysis Project (مشروع تحليل البيانات)

> **المادة:** البرمجة المتقدمة 2 (القسم النظري) | **الموضوع:** Data Visualization & Data Analysis using `matplotlib`, `pygal`, `csv`, `json`

---

## 📌 خريطة التكامل (أين تقع هذه المحاضرة في الدورة؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| أساسيات Python | `variables`، `lists`، `loops`، `functions` | فهم بنية الكود |
| البرمجة الكائنية OOP | `class`، `__init__`، `self`، `methods` | بناء كلاسات قابلة لإعادة الاستخدام |
| **Data Visualization & Analysis ← أنت هنا** | `matplotlib`، `pygal`، `csv`، `json`، `random`، `datetime` | رسم بيانية، تحليل CSV/JSON، خرائط عالمية |
| Machine Learning | `scikit-learn`، `pandas`، `numpy` | نماذج تنبؤية |

> **نوع هذه المحاضرة:** Data Visualization + Downloading Data + JSON Mapping — تجمع بين الكود والمخططات والبيانات الحقيقية.

---

## الجزء الأول: الشرح التفصيلي

> **مهم**: كل قسم يبدأ بـ «النص الأصلي يقول» ثم «الشرح المبسّط». الأقسام مرقّمة هرمياً.

---

### 1. المشي العشوائي — `RandomWalk` Class

#### النص الأصلي يقول:
> A class to generate random walks — All walks start at (0, 0). fill_walk() calculates all the points using random direction and distance.

#### الشرح المبسّط:
تخيّل أنك تقف في منتصف ميدان كبير وتقلب عملة معدنية في كل خطوة: وجه → تمشي يمينًا، ظهر → تمشي يسارًا. وتقلب عملة أخرى للأمام/الخلف. بعد 5000 خطوة ترسم مسارك — هذا هو `RandomWalk`.

**لماذا؟** يُستخدم لمحاكاة الظواهر الطبيعية كحركة الجزيئات، تقلبات سوق الأسهم، وانتشار الأمراض.

---

### 1.1. بناء كلاس `RandomWalk`

#### النص الأصلي يقول:
```python
from random import choice
class RandomWalk():
    def __init__(self, num_points=10):
        self.num_points = num_points
        self.x_values = [0]
        self.y_values = [0]
```

#### 💻 الكود: تعريف كلاس RandomWalk

#### ما هذا الكود؟
> يُنشئ كلاسًا يُمثّل المشي العشوائي — يخزّن النقاط ويبدأ دائمًا من الأصل (0,0).

```python
from random import choice  # import choice function for random direction

class RandomWalk():
    """A class to generate random walks."""

    def __init__(self, num_points=10):
        """Initialize attributes of a walk."""
        self.num_points = num_points  # total number of steps
        # All walks start at (0, 0)
        self.x_values = [0]           # list of x-coordinates, starts at 0
        self.y_values = [0]           # list of y-coordinates, starts at 0
```

#### شرح كل سطر:
1. `from random import choice` → استيراد دالة `choice` التي تختار عنصرًا عشوائيًا من قائمة.
2. `class RandomWalk():` → تعريف الكلاس.
3. `def __init__(self, num_points=10):` → دالة البناء — القيمة الافتراضية 10 نقاط (يمكن تغييرها عند الإنشاء).
4. `self.num_points = num_points` → حفظ عدد النقاط كخاصية للكائن.
5. `self.x_values = [0]` → قائمة إحداثيات X، تبدأ بنقطة الأصل 0.
6. `self.y_values = [0]` → قائمة إحداثيات Y، تبدأ بنقطة الأصل 0.

**المكتبات المطلوبة (Imports):**
> `from random import choice`

---

### 1.2. دالة `fill_walk()`

#### النص الأصلي يقول:
> fill_walk() keeps taking steps until the walk reaches the desired length. Decides which direction to go (x_direction, x_distance), rejects moves that go nowhere.

#### 💻 الكود: دالة fill_walk

#### ما هذا الكود؟
> تملأ قائمتَي x_values و y_values بالنقاط العشوائية خطوة بخطوة حتى الوصول إلى num_points.

```python
def fill_walk(self):
    """Calculate all the points in the walk."""
    # Keep taking steps until the walk reaches the desired length
    while len(self.x_values) < self.num_points:
        # Decide direction: +1 (right/up) or -1 (left/down)
        x_direction = choice([1, -1])
        # Decide distance: 0 to 4 units
        x_distance = choice([0, 1, 2, 3, 4])
        # Combine direction and distance into one step
        x_step = x_direction * x_distance

        y_direction = choice([1, -1])
        y_distance = choice([0, 1, 2, 3, 4])
        y_step = y_direction * y_distance

        # Reject moves that go nowhere (both steps are 0)
        if x_step == 0 and y_step == 0:
            continue

        # Calculate the next x and y values
        next_x = self.x_values[-1] + x_step
        next_y = self.y_values[-1] + y_step

        self.x_values.append(next_x)
        self.y_values.append(next_y)
```

#### شرح كل سطر:
1. `while len(self.x_values) < self.num_points:` → استمر طالما لم نصل لعدد النقاط المطلوب.
2. `x_direction = choice([1, -1])` → اختر يمين (+1) أو يسار (-1) عشوائيًا.
3. `x_distance = choice([0, 1, 2, 3, 4])` → اختر المسافة من 0 إلى 4.
4. `x_step = x_direction * x_distance` → الخطوة الفعلية = الاتجاه × المسافة.
5. `if x_step == 0 and y_step == 0: continue` → إذا لم تتحرك في أي اتجاه، تجاهل هذه الجولة.
6. `next_x = self.x_values[-1] + x_step` → النقطة الجديدة = آخر نقطة + الخطوة.
7. `self.x_values.append(next_x)` → أضف النقطة الجديدة للقائمة.

#### مهم للامتحان ⚠️:
> `self.x_values[-1]` يعني آخر عنصر في القائمة — نقطة الموضع الحالية.

#### 💡 التشبيه:
> `x_direction * x_distance` مثل قرار السائق: يختار اليمين أو اليسار (الاتجاه) ثم يضغط على الدواسة بقدر معين (المسافة).
> **وجه الشبه:** `x_direction` = التوجيه على عجلة القيادة، `x_distance` = كمية الضغط على الدواسة.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا نرفض الحركة عندما يكون `x_step == 0 and y_step == 0`؟
> **لماذا هذا مهم؟** لأن `choice([0,1,2,3,4])` يمكن أن يُرجع 0، مما يعني x_distance=0 و y_distance=0 في نفس الوقت → لا حركة → نُضيّع نقطة من العدد المطلوب دون فائدة.

---

### 1.3. رسم `RandomWalk` باستخدام `matplotlib`

#### النص الأصلي يقول:
> plt.scatter(rw.x_values, rw.y_values, c=rw.y_values, s=15) — color points by y_value.

#### 💻 الكود: رسم المشي العشوائي (10 نقاط)

#### ما هذا الكود؟
> يرسم نقاط المشي العشوائي على مخطط scatter — يُلوّن النقاط حسب قيمة Y.

```python
import matplotlib.pyplot as plt        # import matplotlib for plotting
from random_walk import RandomWalk     # import our custom class

# Create a random walk object and fill it
rw = RandomWalk()           # default: 10 points
rw.fill_walk()              # generate all points

# Plot using both line and scatter
plt.plot(rw.x_values, rw.y_values)    # connect points with a line
plt.scatter(rw.x_values, rw.y_values, c=rw.y_values, s=15)  # scatter colored by y
plt.show()                             # display the plot
```

#### شرح كل سطر:
1. `import matplotlib.pyplot as plt` → استيراد مكتبة الرسم.
2. `from random_walk import RandomWalk` → استيراد الكلاس من ملف منفصل.
3. `rw = RandomWalk()` → إنشاء كائن بـ 10 نقاط افتراضية.
4. `rw.fill_walk()` → ملء النقاط عشوائيًا.
5. `plt.plot(...)` → رسم خط يصل النقاط بالترتيب.
6. `plt.scatter(..., c=rw.y_values, s=15)` → رسم نقاط — `c` هو اللون (مرتبط بقيمة Y)، `s` هو الحجم.
7. `plt.show()` → عرض المخطط.

**الناتج المتوقع (لقطة الشاشة):**
> مخطط scatter بـ 10 نقاط متصلة بخط — الصفحة 3 من المحاضرة تُظهر مثالًا بمحور X من 0 إلى 10 ومحور Y من -5 إلى 3.

---

### 1.4. المشي بـ 5000 نقطة

#### النص الأصلي يقول:
> def __init__(self, num_points=5000) — increase to 5000 points, use only scatter (no plot line).

#### الشرح المبسّط:
بدل 10 خطوات نجعل الكلاس يقطع 5000 خطوة — هذا يُعطي شكلًا أشبه بسحابة أو نبات فطري ملوّن.

#### 🖼️ وصف الشاشة: مخطط 5000 نقطة

> **الصفحة/الشريحة:** 4
> **ملاحظة:** لا يمكن عرض لقطة الشاشة في الموقع — الوصف التالي يغطي كل عنصر.

| العنصر | الموقع | الوظيفة |
| --- | --- | --- |
| محور X | أسفل المخطط | النطاق 0–300 تقريبًا |
| محور Y | يسار المخطط | النطاق -100 إلى +100 |
| ألوان النقاط | متدرّجة أخضر-أصفر-بنفسجي | تعكس قيمة Y (colormap افتراضي) |
| شكل المخطط | سحابة كثيفة | 5000 نقطة متداخلة |

---

### 1.5. المشي المتعدد وخيارات العرض

#### النص الأصلي يقول:
> while True loop — generate multiple walks until user enters 'n'. plt.figure(figsize=(10,6)) / plt.figure(dpi=128, figsize=(10,6))

#### 💻 الكود: حلقة مشي متعدد مع تحديد حجم الشاشة

#### ما هذا الكود؟
> يُتيح للمستخدم توليد مشيات عشوائية متعددة حتى يضغط 'n' للإيقاف، مع التحكم في حجم ودقة المخطط.

```python
import matplotlib.pyplot as plt
from random_walk import RandomWalk

while True:
    # Generate a new random walk each iteration
    rw = RandomWalk()
    rw.fill_walk()

    # Create figure with specific size and DPI (dots per inch)
    plt.figure(dpi=128, figsize=(10, 6))  # high resolution, 10x6 inches

    # Color points by order (point_numbers) using Blues colormap
    point_numbers = list(range(rw.num_points))  # [0, 1, 2, ..., 4999]
    plt.scatter(rw.x_values, rw.y_values,
                c=point_numbers,            # color by step number
                cmap=plt.cm.Blues,          # blue colormap
                edgecolor='none',           # no edge around dots
                s=15)                       # dot size

    plt.show()

    # Ask user if they want another walk
    keep_running = input("Make another walk? (y/n): ")
    if keep_running == 'n':
        break
```

#### شرح كل سطر:
1. `while True:` → حلقة لا تنتهي حتى يُوقفها المستخدم.
2. `plt.figure(dpi=128, figsize=(10, 6))` → `dpi=128` يرفع جودة الصورة، `figsize=(10,6)` يحدد الحجم بالإنش.
3. `point_numbers = list(range(rw.num_points))` → يُنشئ قائمة أرقام 0,1,2,...4999 لاستخدامها كألوان.
4. `c=point_numbers` → يُلوّن النقاط حسب ترتيبها (النقاط الأولى فاتحة، الأخيرة داكنة).
5. `cmap=plt.cm.Blues` → نظام الألوان الأزرق.
6. `edgecolor='none'` → بدون حدود حول النقاط (أنظف بصريًا).
7. `if keep_running == 'n': break` → خروج من الحلقة.

**الفهم الخاطئ ❌:** `figsize` يقيس البكسل.
**الفهم الصحيح ✅:** `figsize` يقيس بالإنش — `dpi` هو عدد النقاط في كل إنش.

---

### 1.6. تلوين نقطتَي البداية والنهاية

#### النص الأصلي يقول:
> plt.scatter(0, 0, c='green', s=100) — start point. plt.scatter(rw.x_values[-1], rw.y_values[-1], c='red', s=100) — end point.

#### 💻 الكود: تمييز البداية والنهاية

#### ما هذا الكود؟
> يضيف نقطة خضراء كبيرة عند البداية (0,0) ونقطة حمراء عند آخر موقع للتمييز البصري.

```python
# Emphasize the first and last points
plt.scatter(0, 0,
            c='green',           # green = start
            edgecolors='none',
            s=100)               # larger size to stand out

plt.scatter(rw.x_values[-1], rw.y_values[-1],
            c='red',             # red = end
            edgecolors='none',
            s=100)
```

#### شرح كل سطر:
1. `plt.scatter(0, 0, c='green', s=100)` → رسم نقطة واحدة عند (0,0) باللون الأخضر وحجم 100.
2. `rw.x_values[-1]` → إحداثي X لآخر نقطة في المشي.
3. `rw.y_values[-1]` → إحداثي Y لآخر نقطة في المشي.
4. `c='red'` → اللون الأحمر لنقطة النهاية.

#### 💡 التشبيه:
> نقطة البداية الخضراء والنهاية الحمراء مثل إشارة المرور: أخضر = انطلق، أحمر = توقف.
> **وجه الشبه:** اللون الأخضر = بداية المشي، اللون الأحمر = نهايته.

---

### 2. رمي النرد مع `pygal` — Rolling Dice

#### النص الأصلي يقول:
> A class representing a single die. def roll(): return randint(1, self.num_sides). Visualize using pygal.Bar() histogram.

#### الشرح المبسّط:
بدل رمي نرد حقيقي، نكتب برنامجًا يرمي النرد 1000 مرة ويحسب كم مرة ظهر كل رقم ثم يرسم مخططًا عموديًا `Bar chart`.

**لماذا؟** نريد إثبات أن النرد العادل يُنتج كل رقم بنفس الاحتمالية (1/6) — وهذا يظهر جليًا عند 1000 رمية.

---

### 2.1. كلاس `Die`

#### 💻 الكود: كلاس Die

#### ما هذا الكود؟
> يُعرّف نردًا رقميًا بأي عدد من الأوجه، الافتراضي 6 أوجه.

```python
from random import randint  # import randint for random integer generation

class Die():
    """A class representing a single die."""

    def __init__(self, num_sides=6):
        """Assume a six-sided die by default."""
        self.num_sides = num_sides  # store number of sides

    def roll(self):
        """Return a random value between 1 and number of sides."""
        return randint(1, self.num_sides)  # inclusive on both ends
```

#### شرح كل سطر:
1. `from random import randint` → `randint(a,b)` يُرجع رقمًا عشوائيًا بين a و b شاملًا.
2. `def __init__(self, num_sides=6):` → افتراضيًا نرد 6 أوجه، يمكن تمرير 10 أو 12.
3. `self.num_sides = num_sides` → حفظ عدد الأوجه.
4. `return randint(1, self.num_sides)` → محاكاة رمي النرد.

#### مهم للامتحان ⚠️:
> `randint(1, 6)` يُرجع من 1 إلى 6 شاملًا — لا كـ `range(6)` التي تُعطي 0 إلى 5.

---

### 2.2. رمي النرد وتحليل النتائج

#### النص الأصلي يقول:
> Roll 1000 times, store in results list. Count frequency of each value using results.count(value).

#### 💻 الكود: رمي النرد 1000 مرة وتحليل التكرار

#### ما هذا الكود؟
> يرمي النرد 1000 مرة ويحسب تكرار كل وجه ثم يطبع النتائج.

```python
from die import Die  # import Die class from die.py

# Create a six-sided die
die = Die()

# Roll 1000 times and store results
results = []
for roll_num in range(1000):
    result = die.roll()       # roll the die
    results.append(result)    # store result

# Analyze: count frequency of each face
frequencies = []
for value in range(1, die.num_sides + 1):      # loop from 1 to 6
    frequency = results.count(value)            # count occurrences
    frequencies.append(frequency)

print(frequencies)  # e.g. [159, 160, 165, 165, 184, 167]
```

#### شرح كل سطر:
1. `for roll_num in range(1000):` → كرّر 1000 مرة.
2. `results.append(result)` → أضف كل نتيجة للقائمة.
3. `for value in range(1, die.num_sides + 1):` → من 1 إلى 6 (شامل).
4. `results.count(value)` → عدّ كم مرة ظهر هذا الرقم في القائمة.

**الناتج المتوقع (لقطة الشاشة):**
> `[159, 160, 165, 165, 184, 167]` — أرقام متقاربة (عشوائية في كل تشغيل).

---

### 2.3. رسم المدرج التكراري مع `pygal`

#### النص الأصلي يقول:
> import pygal; hist = pygal.Bar(); hist.render_to_file('die_visual.svg') or hist.render_in_browser()

#### 💻 الكود: رسم Bar Chart بـ pygal

#### ما هذا الكود؟
> يُنشئ مدرجًا تكراريًا تفاعليًا بصيغة SVG يُعرض في المتصفح.

```python
import pygal  # import pygal for interactive charts

# Create a Bar chart object
hist = pygal.Bar()
hist.title = "Results of rolling one D6 1000 times."
hist.x_labels = ['1', '2', '3', '4', '5', '6']  # x-axis labels
hist.x_title = "Result"           # x-axis title
hist.y_title = "Frequency of Result"  # y-axis title

# Add data series named 'D6'
hist.add('D6', frequencies)

# Save as SVG file or render in browser
hist.render_to_file('die_visual.svg')
# hist.render_in_browser()  # alternative: opens in default browser
```

#### شرح كل سطر:
1. `pygal.Bar()` → إنشاء مخطط عمودي.
2. `hist.title` → عنوان المخطط.
3. `hist.x_labels` → تسميات محور X (قائمة نصوص).
4. `hist.add('D6', frequencies)` → إضافة بيانات باسم 'D6' وقيم التكرار.
5. `hist.render_to_file(...)` → حفظ المخطط كملف SVG.
6. `hist.render_in_browser()` → فتح المخطط مباشرة في المتصفح (شرح زيادة للفهم).

**المكتبات المطلوبة (Imports):**
> `import pygal`

#### 🛠️ استكشاف الأخطاء

| الخطأ | السبب | الحل |
| --- | --- | --- |
| `ModuleNotFoundError: No module named 'pygal'` | المكتبة غير مثبّتة | `pip install pygal` |
| مخطط فارغ | نسيت `hist.add(...)` | أضف البيانات قبل `render` |
| ملف SVG لا يفتح | لا يوجد برنامج يقرأ SVG | استخدم `render_in_browser()` بدلًا |

---

### 2.4. رمي نردَين D6 + D6

#### النص الأصلي يقول:
> Create two D6 dice, sum results. max_result = die_1.num_sides + die_2.num_sides. Range from 2 to max_result+1.

#### 💻 الكود: رمي نردَين والجمع

#### ما هذا الكود؟
> يرمي نردَين في نفس الوقت ويجمع النتيجتين — يُنتج توزيعًا مثلثيًا الشكل (7 هو الأكثر احتمالًا).

```python
import pygal
from die import Die

# Create two six-sided dice
die_1 = Die()   # D6
die_2 = Die()   # D6

# Roll both 1000 times and sum results
results = []
for roll_num in range(1000):
    result = die_1.roll() + die_2.roll()  # sum of two dice
    results.append(result)

# Analyze: count each possible sum (2 to 12)
frequencies = []
max_result = die_1.num_sides + die_2.num_sides  # 6+6 = 12
for value in range(2, max_result + 1):           # range 2 to 12
    frequency = results.count(value)
    frequencies.append(frequency)

# Visualize
hist = pygal.Bar()
hist.title = "Results of rolling two D6 dice 1000 times."
hist.x_labels = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
hist.x_title = "Result"
hist.y_title = "Frequency of Result"
hist.add('D6 + D6', frequencies)
hist.render_to_file('dice_visual2.svg')
```

#### شرح كل سطر:
1. `result = die_1.roll() + die_2.roll()` → مجموع نتيجتَي النردَين.
2. `max_result = die_1.num_sides + die_2.num_sides` → الحد الأقصى = 12 (6+6).
3. `range(2, max_result + 1)` → من 2 (أقل مجموع) إلى 12 (أكبر مجموع).

**الناتج المتوقع (لقطة الشاشة):**
> الصفحة 11: مخطط به شكل مثلث — 7 أعلى عمود لأن هناك 6 طرق للحصول عليه (1+6، 2+5، 3+4...).

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا يحصل 7 على أعلى تكرار عند رمي نردَين؟
> **لماذا هذا مهم؟** لأن عدد التوافيق التي تُعطي 7 هو 6 من أصل 36 = 1/6، بينما 2 أو 12 لهما توافيق واحدة فقط = 1/36.

---

### 2.5. نردَين بأحجام مختلفة D6 + D10

#### النص الأصلي يقول:
> die_1 = Die(), die_2 = Die(10) — roll 50,000 times. x_labels from '2' to '16'.

#### 💻 الكود: نرد 6 أوجه + نرد 10 أوجه

#### ما هذا الكود؟
> يُنشئ نردَين مختلفَين ويرمي 50,000 مرة — يُظهر توزيعًا أوسع (2 إلى 16).

```python
from die import Die
import pygal

# Create a D6 and a D10
die_1 = Die()        # 6-sided die
die_2 = Die(10)      # 10-sided die (custom)

# Roll 50,000 times
results = []
for roll_num in range(50000):
    result = die_1.roll() + die_2.roll()
    results.append(result)

# max possible sum = 6 + 10 = 16
max_result = die_1.num_sides + die_2.num_sides  # 16
frequencies = []
for value in range(2, max_result + 1):  # 2 to 16
    frequency = results.count(value)
    frequencies.append(frequency)

# Visualize
hist = pygal.Bar()
hist.title = "Results of rolling a D6 and a D10 50,000 times."
hist.x_labels = ['2', '3', '4', '5', '6', '7', '8', '9', '10',
                 '11', '12', '13', '14', '15', '16']
hist.x_title = "Result"
hist.y_title = "Frequency of Result"
hist.add('D6 + D10', frequencies)
hist.render_to_file('dice_visual3.svg')
hist.render_in_browser()  # open in browser
```

#### شرح كل سطر:
1. `die_2 = Die(10)` → نرد بـ 10 أوجه — نمرر 10 لـ `num_sides`.
2. `range(50000)` → 50,000 رمية لتوزيع أكثر دقة.
3. `range(2, max_result + 1)` → من 2 إلى 16.

**الناتج المتوقع (لقطة الشاشة):**
> الصفحة 13: التوزيع أوسع — أعمدة 7 إلى 12 هي الأعلى (بسبب تداخل النردَين).

---

### 3. تحميل وتحليل البيانات — Downloading Data

#### النص الأصلي يقول:
> import csv; reader = csv.reader(f); header_row = next(reader) — parse CSV headers.

#### الشرح المبسّط:
بدل إدخال البيانات يدويًا، نقرأها من ملفات CSV (جداول بيانات). مثل فتح ملف Excel ولكن بالكود.

**لماذا؟** البيانات الحقيقية (أرصاد جوية، أسهم، سكان) تأتي دائمًا كملفات CSV أو JSON.

---

### 3.1. قراءة ترويسة CSV

#### 💻 الكود: قراءة ترويسة CSV

#### ما هذا الكود؟
> يفتح ملف CSV ويقرأ الصف الأول (الترويسة) لمعرفة أسماء الأعمدة.

```python
import csv  # built-in CSV module

filename = 'd:\sitka_weather_07-2014.csv'  # path to CSV file

with open(filename) as f:        # open file safely
    reader = csv.reader(f)       # create CSV reader object
    header_row = next(reader)    # read ONLY the first row (headers)
    print(header_row)            # print list of column names
```

#### شرح كل سطر:
1. `import csv` → وحدة CSV مدمجة في Python — لا تحتاج تثبيتًا.
2. `with open(filename) as f:` → فتح الملف آمنًا (يُغلق تلقائيًا بعد الانتهاء).
3. `csv.reader(f)` → يحوّل الملف لكائن قابل للتكرار سطرًا بسطر.
4. `next(reader)` → يقرأ الصف التالي — أول مرة يُرجع الترويسة.
5. `print(header_row)` → يطبع قائمة بأسماء الأعمدة.

**الناتج المتوقع (لقطة الشاشة):**
> `['AKDT', 'Max TemperatureF', 'Mean TemperatureF', 'Min TemperatureF', ...]`

---

### 3.2. طباعة الترويسات مع أرقامها

#### النص الأصلي يقول:
> for index, column_header in enumerate(header_row): print(index, column_header)

#### 💻 الكود: enumerate لمعرفة رقم كل عمود

#### ما هذا الكود؟
> يطبع رقم كل عمود واسمه — يساعد في معرفة أي `index` نستخدم لاحقًا.

```python
for index, column_header in enumerate(header_row):
    print(index, column_header)  # print position and name
```

#### شرح كل سطر:
1. `enumerate(header_row)` → تُرجع أزواج (رقم، قيمة) — مثل: (0, 'AKDT')، (1, 'Max TemperatureF').

**الناتج المتوقع (لقطة الشاشة):**
> ```
> 0 AKDT
> 1 Max TemperatureF
> 2 Mean TemperatureF
> ...
> 22 WindDirDegrees
> ```

#### 💡 التشبيه:
> `enumerate` مثل فهرس الكتاب — يُخبرك برقم الصفحة واسم الفصل في نفس الوقت.
> **وجه الشبه:** `index` = رقم الصفحة، `column_header` = اسم الفصل.

---

### 3.3. استخراج بيانات الحرارة

#### النص الأصلي يقول:
> highs.append(int(row[2])) — extract Mean TemperatureF as integer.

#### 💻 الكود: قراءة درجات الحرارة من CSV

#### ما هذا الكود؟
> يقرأ قيم العمود رقم 2 (Mean Temperature) من كل صف ويُحوّلها لأعداد صحيحة.

```python
import csv

filename = 'sitka_weather_07-2014.csv'
with open(filename) as f:
    reader = csv.reader(f)
    header_row = next(reader)    # skip header

    highs = []
    for row in reader:           # iterate remaining rows
        high = int(row[2])       # column index 2 = Mean Temperature, convert to int
        highs.append(high)

print(highs)
```

#### شرح كل سطر:
1. `for row in reader:` → يتكرر على باقي الصفوف (بعد الترويسة).
2. `row[2]` → قيمة العمود رقم 2 كنص.
3. `int(row[2])` → تحويل النص '64' إلى عدد صحيح 64.

**الناتج المتوقع (لقطة الشاشة):**
> `[64, 71, 64, 59, 69, 62, 61, 55, ...]`

---

### 3.4. رسم مخطط درجات الحرارة

#### 💻 الكود: رسم درجات الحرارة

#### ما هذا الكود؟
> يرسم مخطط خطي لدرجات الحرارة اليومية بتنسيق احترافي.

```python
import csv
from matplotlib import pyplot as plt

filename = 'd:\sitka_weather_07-2014.csv'
with open(filename) as f:
    reader = csv.reader(f)
    header_row = next(reader)
    highs = []
    for row in reader:
        high = int(row[2])      # Mean Temperature column
        highs.append(high)

# Create figure with high DPI
fig = plt.figure(dpi=128, figsize=(10, 6))
plt.plot(highs, c='red')        # red line chart

# Format the plot
plt.title("Daily high temperatures, July 2014", fontsize=24)
plt.xlabel('', fontsize=16)     # no x-label text
plt.ylabel("Temperature (F)", fontsize=16)
plt.tick_params(axis='both', which='major', labelsize=16)  # tick font size
plt.show()
```

#### شرح كل سطر:
1. `fig = plt.figure(dpi=128, figsize=(10, 6))` → إنشاء شكل عالي الجودة.
2. `plt.plot(highs, c='red')` → رسم خط أحمر — محور X ضمني (0,1,2...).
3. `plt.title(..., fontsize=24)` → عنوان بخط حجم 24.
4. `plt.tick_params(...)` → ضبط حجم خط الأرقام على المحورَين.

---

### 3.5. رسم التواريخ مع `datetime`

#### النص الأصلي يقول:
> from datetime import datetime; current_date = datetime.strptime(row[0], "%m/%d/%Y"); fig.autofmt_xdate()

#### 💻 الكود: رسم درجات الحرارة مع تواريخ حقيقية

#### ما هذا الكود؟
> يُحوّل نصوص التاريخ لكائنات `datetime` حقيقية ثم يرسمها على محور X.

```python
import csv
from datetime import datetime      # for parsing date strings
from matplotlib import pyplot as plt

filename = 'd:\sitka_weather_07-2014.csv'
with open(filename) as f:
    reader = csv.reader(f)
    header_row = next(reader)

    dates, highs = [], []
    for row in reader:
        # Parse date string "07/01/2014" into datetime object
        current_date = datetime.strptime(row[0], "%m/%d/%Y")
        dates.append(current_date)
        high = int(row[2])
        highs.append(high)

# Plot
fig = plt.figure(dpi=128, figsize=(10, 6))
plt.plot(dates, highs, c='red')   # use dates on x-axis

plt.title("Daily high temperatures, July 2014", fontsize=24)
plt.xlabel('', fontsize=16)
fig.autofmt_xdate()               # auto-format x-axis dates (tilt labels)
plt.ylabel("Temperature (F)", fontsize=16)
plt.tick_params(axis='both', which='major', labelsize=16)
plt.show()
```

#### شرح كل سطر:
1. `datetime.strptime(row[0], "%m/%d/%Y")` → تحليل نص التاريخ حسب الصيغة: `%m`=شهر، `%d`=يوم، `%Y`=سنة 4 أرقام.
2. `plt.plot(dates, highs, c='red')` → محور X = تواريخ حقيقية، Y = درجات حرارة.
3. `fig.autofmt_xdate()` → يُمال تسميات التواريخ لتتناسب مع المساحة (منع التداخل).

#### مهم للامتحان ⚠️:
> صيغة التاريخ مهمة جدًا — `%m/%d/%Y` تعني "شهر/يوم/سنة". إذا كان الملف بصيغة مختلفة ("2014-07-01") استخدم `"%Y-%m-%d"`.

---

### 3.6. جدول تنسيقات `datetime`

#### النص الأصلي يقول:
> Date and Time Formatting Arguments from the datetime Module

| الرمز | المعنى |
| --- | --- |
| `%A` | اسم اليوم (Monday) |
| `%B` | اسم الشهر (January) |
| `%m` | رقم الشهر (01–12) |
| `%d` | رقم اليوم (01–31) |
| `%Y` | السنة 4 أرقام (2015) |
| `%y` | السنة رقمَين (15) |
| `%H` | الساعة 24 ساعة (00–23) |
| `%I` | الساعة 12 ساعة (01–12) |
| `%p` | am أو pm |
| `%M` | الدقائق (00–59) |
| `%S` | الثواني (00–61) |

---

### 3.7. رسم فترة زمنية أطول (سنة كاملة) وظل المنطقة

#### النص الأصلي يقول:
> plt.fill_between(dates, highs, lows, facecolor='green', alpha=0.1) — shade the area between high and low temperatures.

#### 💻 الكود: رسم أعلى وأدنى درجات الحرارة مع تظليل المنطقة

#### ما هذا الكود؟
> يرسم خطَّين (أحمر وأزرق) ويظلّل المنطقة بينهما لإظهار نطاق درجات الحرارة اليومي.

```python
import csv
from datetime import datetime
from matplotlib import pyplot as plt

filename = 'sitka_weather_2014.csv'
with open(filename) as f:
    reader = csv.reader(f)
    header_row = next(reader)

    dates, highs, lows = [], [], []    # three separate lists
    for row in reader:
        # Date format in this file is "YYYY-MM-DD"
        current_date = datetime.strptime(row[1], "%Y-%m-%d")
        dates.append(current_date)
        high = int(row[2])
        highs.append(high)
        low = int(row[4])              # column 4 = Min Temperature
        lows.append(low)

# Plot both temperature lines
fig = plt.figure(dpi=128, figsize=(10, 6))
plt.plot(dates, highs, c='red')        # high temperatures in red
plt.plot(dates, lows, c='blue')        # low temperatures in blue

# Shade the region between high and low
plt.fill_between(dates, highs, lows,
                 facecolor='green',    # fill color
                 alpha=0.1)            # transparency (10% opacity)

plt.title("Daily high and low temperatures 2013", fontsize=24)
plt.xlabel('', fontsize=16)
fig.autofmt_xdate()
plt.ylabel("Temperature (F)", fontsize=16)
plt.tick_params(axis='both', which='major', labelsize=16)
plt.show()
```

#### شرح كل سطر:
1. `dates, highs, lows = [], [], []` → ثلاث قوائم فارغة في سطر واحد.
2. `row[4]` → العمود رقم 4 يحتوي Min Temperature.
3. `plt.fill_between(dates, highs, lows, ...)` → تظليل المنطقة بين قائمتَي highs و lows.
4. `alpha=0.1` → شفافية 10% — يجعل التظليل خفيفًا ولا يُخفي الخطوط.

#### 💡 التشبيه:
> `fill_between` مثل ملء الفجوة بين سطح ميناء وقاعه — يُريك العمق (نطاق الحرارة) بصريًا.
> **وجه الشبه:** `highs` = سطح الميناء، `lows` = القاع، `fill_between` = الماء بينهما.

---

### 4. تحليل البيانات العالمية — Mapping Global Data Sets (JSON)

#### النص الأصلي يقول:
> import json; pop_data = json.load(f) — load population data. Filter Year == '2010', convert population to int(float(...)).

#### الشرح المبسّط:
JSON هو تنسيق بيانات شائع مثل القاموس في Python — نقرأه بـ `json.load()` ثم نحوّله لخريطة عالمية بـ `pygal`.

**لماذا؟** كثير من APIs والمواقع تُرسل بيانات بصيغة JSON — فهم قراءتها أساسي.

---

### 4.1. قراءة ملف JSON

#### 💻 الكود: قراءة ملف JSON للسكان

#### ما هذا الكود؟
> يقرأ ملف بيانات سكانية JSON ويطبع عدد سكان كل دولة عام 2010.

```python
import json  # built-in JSON module

filename = 'd:\population_data.json'
with open(filename) as f:
    pop_data = json.load(f)   # parse entire JSON file into Python list

# Filter records for year 2010
for pop_dict in pop_data:
    if pop_dict['Year'] == '2010':
        country_name = pop_dict['Country Name']
        population = pop_dict['Value']
        print(country_name + ": " + population)
```

#### شرح كل سطر:
1. `json.load(f)` → يحوّل الملف JSON إلى قائمة Python من القواميس.
2. `pop_dict['Year'] == '2010'` → نُصفّي على السنة (القيمة نص وليست رقمًا!).
3. `pop_dict['Country Name']` → اسم الدولة.
4. `pop_dict['Value']` → عدد السكان كنص.

#### مهم للامتحان ⚠️:
> `population = int(float(pop_dict['Value']))` — يجب استخدام `float` أولًا لأن بعض القيم كـ `'1127437398.85751'` لا يمكن تحويلها مباشرة لـ `int`.

**الفهم الخاطئ ❌:** `int('1127437398.85751')` يعمل.
**الفهم الصحيح ✅:** `int('1127437398.85751')` يُلقي `ValueError` — يجب `int(float('1127437398.85751'))`.

---

### 4.2. رموز الدول مع `pygal_maps_world`

#### النص الأصلي يقول:
> from pygal.maps.world import COUNTRIES; get_country_code() — returns 2-letter ISO code. pip install pygal_maps_world.

#### 💻 الكود: الحصول على رمز الدولة

#### ما هذا الكود؟
> دالة تُرجع رمز الدولة المكوّن من حرفَين (ISO) من اسمها الكامل.

```python
from pygal.maps.world import COUNTRIES  # dictionary of country codes

def get_country_code(country_name):
    """Return the Pygal 2-digit country code for the given country."""
    for code, name in COUNTRIES.items():   # loop through all countries
        if name == country_name:           # find matching name
            return code                    # return the 2-letter code
    return None                            # not found

# Test
print(get_country_code('Andorra'))               # → 'ad'
print(get_country_code('United Arab Emirates'))  # → 'ae'
print(get_country_code('Afghanistan'))           # → 'af'
```

#### شرح كل سطر:
1. `COUNTRIES` → قاموس مدمج في `pygal_maps_world` يربط الرموز بالأسماء: `{'ad': 'Andorra', 'ae': 'United Arab Emirates', ...}`.
2. `COUNTRIES.items()` → يُرجع أزواج (رمز، اسم).
3. `if name == country_name: return code` → مطابقة اسمية دقيقة.
4. `return None` → إذا لم تُوجد الدولة في القاموس.

**المكتبات المطلوبة (Imports):**
> `pip install pygal_maps_world` ثم `from pygal.maps.world import COUNTRIES`

---

### 4.3. رسم خريطة عالمية

#### النص الأصلي يقول:
> from pygal_maps_world.maps import World; wm.add('North America', ['ca','mx','us']); wm.render_to_file() or render_in_browser()

#### 💻 الكود: بناء خريطة العالم

#### ما هذا الكود؟
> يرسم خريطة عالمية ويُلوّن كل منطقة بلون مختلف.

```python
from pygal_maps_world.maps import World  # world map class

wm = World()   # create world map object
wm.title = 'North, Central, and South America'

# Add groups of countries with labels and colors
wm.add('North America', ['ca', 'mx', 'us'])   # Canada, Mexico, USA
wm.add('Central America', ['bz', 'cr', 'gt', 'hn', 'ni', 'pa', 'sv'])
wm.add('South America', ['ar', 'bo', 'br', 'cl', 'co', 'ec', 'gf',
                          'gy', 'pe', 'py', 'sr', 'uy', 've'])

wm.render_to_file('americas.svg')   # save as SVG
# wm.render_in_browser()            # or open in browser
```

#### شرح كل سطر:
1. `World()` → إنشاء كائن الخريطة العالمية.
2. `wm.add('North America', ['ca', 'mx', 'us'])` → إضافة مجموعة دول مع تسمية (تظهر بنفس اللون).
3. الرموز مثل `'ca'`=Canada، `'mx'`=Mexico، `'us'`=USA، `'br'`=Brazil.

---

### 4.4. خريطة عدد السكان الكاملة

#### 💻 الكود: خريطة السكان العالمية 2010

#### ما هذا الكود؟
> يقرأ بيانات JSON ويُحوّلها لخريطة ملوّنة حسب عدد السكان.

```python
import json
from pygal_maps_world.maps import World
from country_codes import get_country_code  # our helper function

filename = 'population_data.json'
with open(filename) as f:
    pop_data = json.load(f)

# Build dictionary: country_code -> population
cc_populations = {}
for pop_dict in pop_data:
    if pop_dict['Year'] == '2010':
        country_name = pop_dict['Country Name']
        population = int(float(pop_dict['Value']))  # safe conversion
        code = get_country_code(country_name)
        if code:                                     # only if code found
            cc_populations[code] = population

# Draw world map
wm = World()
wm.title = 'World Population in 2010, by Country'
wm.add('2010', cc_populations)              # pass dict {code: population}
wm.render_to_file('world_population.svg')
```

#### شرح كل سطر:
1. `cc_populations = {}` → قاموس فارغ سيحمل رمز الدولة ← عدد السكان.
2. `int(float(pop_dict['Value']))` → تحويل آمن لقيم مثل '1127437398.85751'.
3. `if code:` → نتجاهل الدول التي لم يُوجد لها رمز (مجموعات إقليمية مثل 'Arab World').
4. `wm.add('2010', cc_populations)` → تمرير القاموس كاملًا — pygal يُلوّن حسب القيمة.

---

### 4.5. تجميع الدول حسب عدد السكان

#### النص الأصلي يقول:
> cc_pops_1 (< 10M), cc_pops_2 (10M–1B), cc_pops_3 (> 1B) — three color groups.

#### 💻 الكود: تصنيف الدول لثلاث مجموعات

#### ما هذا الكود؟
> يُصنّف الدول حسب عدد السكان إلى ثلاث مجموعات ويرسمها بثلاثة ألوان مختلفة.

```python
# Classify countries into 3 population groups
cc_pops_1, cc_pops_2, cc_pops_3 = {}, {}, {}
for cc, pop in cc_populations.items():
    if pop < 10_000_000:          # less than 10 million
        cc_pops_1[cc] = pop
    elif pop < 1_000_000_000:     # 10 million to 1 billion
        cc_pops_2[cc] = pop
    else:                         # more than 1 billion
        cc_pops_3[cc] = pop

print(len(cc_pops_1), len(cc_pops_2), len(cc_pops_3))  # count per group

wm = World()
wm.title = 'World Population in 2010, by Country'
wm.add('0-10m', cc_pops_1)       # small countries
wm.add('10m-1bn', cc_pops_2)     # medium countries
wm.add('>1bn', cc_pops_3)        # large countries (China, India)
wm.render_to_file('world_population2.svg')
```

#### شرح كل سطر:
1. `cc_pops_1, cc_pops_2, cc_pops_3 = {}, {}, {}` → إنشاء ثلاثة قواميس دفعة واحدة.
2. `pop < 10_000_000` → Python تسمح بالشرطة السفلية في الأرقام للقراءة (`10_000_000 = 10000000`).
3. `wm.add('0-10m', cc_pops_1)` → كل مجموعة تأخذ لونًا مختلفًا تلقائيًا.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا تُعطي ERROR لدول مثل 'Arab World'؟
> **لماذا هذا مهم؟** لأن `pygal_maps_world` يحتوي رموزًا لدول فقط — المناطق والتجمعات الإقليمية ليست في قاموس COUNTRIES، لذا `get_country_code()` تُرجع None وتُهمَل.

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `RandomWalk` | كلاس يُولّد نقاط مشي عشوائي انطلاقًا من (0,0) | يُستخدم في محاكاة الحركة العشوائية |
| `fill_walk()` | دالة تملأ قوائم x_values و y_values بالنقاط | تُنفَّذ مرة واحدة بعد الإنشاء |
| `choice()` | دالة تختار عنصرًا عشوائيًا من قائمة | `choice([1, -1])` → 1 أو -1 |
| `randint(a, b)` | عدد صحيح عشوائي بين a و b (شاملًا) | `randint(1, 6)` → 1 إلى 6 |
| `scatter plot` | مخطط نقاط — يرسم كل نقطة منفصلة | يدعم تلوين النقاط بـ `c=` |
| `cmap` | خريطة الألوان — تُحدّد طيف الألوان | `plt.cm.Blues`، `plt.cm.Greens` |
| `alpha` | الشفافية (0=شفاف تمامًا، 1=معتم تمامًا) | `alpha=0.1` = شفاف 90% |
| `dpi` | Dots Per Inch — دقة الصورة | `dpi=128` = جودة عالية |
| `figsize` | حجم الشاشة بالإنش (عرض، ارتفاع) | `figsize=(10, 6)` |
| `Die` | كلاس يُمثّل نردًا بعدد أوجه قابل للتخصيص | `Die()` = 6 أوجه، `Die(10)` = 10 أوجه |
| `pygal.Bar()` | مخطط عمودي تفاعلي بصيغة SVG | يدعم `render_to_file()` و `render_in_browser()` |
| `csv.reader()` | كائن يقرأ ملف CSV صفًّا بصفّ | كل صف عبارة عن قائمة |
| `next(reader)` | يقرأ الصف التالي من reader | يُستخدم لتخطي الترويسة |
| `json.load(f)` | يُحوّل ملف JSON لهيكل بيانات Python | يُرجع قائمة أو قاموس |
| `datetime.strptime()` | تحويل نص لكائن `datetime` | يحتاج صيغة مثل `"%m/%d/%Y"` |
| `fig.autofmt_xdate()` | يُمال تسميات محور X للتواريخ | يمنع التداخل |
| `fill_between()` | يظلّل المنطقة بين منحنيَين | يُستخدم لإظهار النطاقات |
| `COUNTRIES` | قاموس pygal — رموز ISO للدول | `{'ad': 'Andorra', 'ae': 'UAE', ...}` |
| `World()` | كلاس خريطة العالم في pygal | يقبل dict من {رمز: قيمة} |

---

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `matplotlib.pyplot` | رسم مخططات خطية وnقاط | `plt.plot()`, `plt.scatter()`, `plt.show()` |
| `pygal` | مخططات تفاعلية SVG | `pygal.Bar()`, `render_to_file()` |
| `pygal_maps_world` | خرائط جغرافية عالمية | يحتاج `pip install pygal_maps_world` |
| `csv` | قراءة ملفات CSV | مدمج في Python |
| `json` | قراءة ملفات JSON | مدمج في Python |
| `datetime` | تحليل وتنسيق التواريخ | `strptime()` للتحليل |
| `random.choice` | اختيار عشوائي من قائمة | يعمل مع أي قائمة |
| `random.randint` | عدد صحيح عشوائي | شامل للحدَّين |

---

### جداول مقارنات سريعة

| المقارنة | `plt.plot()` | `plt.scatter()` | الفرق |
| --- | --- | --- | --- |
| نوع الرسم | خط متصل | نقاط منفصلة | plot يصل بين النقاط |
| التلوين | لون واحد `c=` | لون لكل نقطة `c=قائمة` | scatter أمرن للتلوين |
| الاستخدام | سلاسل زمنية | توزيع نقاط | حسب طبيعة البيانات |

| المقارنة | `render_to_file()` | `render_in_browser()` | الفرق |
| --- | --- | --- | --- |
| المخرج | ملف `.svg` على القرص | فتح مباشر في المتصفح | to_file أفضل للحفظ |
| الاستخدام | إنتاج نهائي | اختبار سريع | — |

| المقارنة | `int(row[2])` | `int(float(row[2]))` | الفرق |
| --- | --- | --- | --- |
| يعمل مع '64' | ✅ | ✅ | — |
| يعمل مع '64.5' | ❌ ValueError | ✅ | يجب float أولًا |
| يعمل مع '1127437398.85751' | ❌ ValueError | ✅ | JSON population data |

---

### قاموس المصطلحات

| الفئة | المصطلحات |
| --- | --- |
| الرسم البياني | `scatter`, `plot`, `fill_between`, `cmap`, `alpha`, `dpi`, `figsize`, `autofmt_xdate` |
| البيانات العشوائية | `RandomWalk`, `fill_walk`, `choice`, `randint`, `Die`, `roll` |
| Pygal | `Bar`, `World`, `render_to_file`, `render_in_browser`, `x_labels`, `x_title`, `y_title`, `add` |
| CSV | `csv.reader`, `next(reader)`, `header_row`, `enumerate` |
| JSON | `json.load`, `pop_data`, `cc_populations` |
| التاريخ | `datetime`, `strptime`, `%m`, `%d`, `%Y`, `%H`, `%M` |
| الخرائط | `COUNTRIES`, `get_country_code`, `World`, `wm.add` |

---

### أبرز النقاط الذهبية
1. **المشي العشوائي** يبدأ دائمًا من (0,0) وكل خطوة تُضاف للموضع السابق.
2. **رفض الحركة الصفرية** (`x_step == 0 and y_step == 0`) ضروري لتجنب إضافة نقاط بدون حركة.
3. **`int(float(...))` ضروري** عند تحويل قيم JSON التي قد تحتوي نقطة عشرية.
4. **`next(reader)` يقرأ صفًّا واحدًا** فقط ثم يتوقف — الصفوف التالية تُقرأ بـ `for row in reader`.
5. **`strptime` حساسة للصيغة** — تطابق الصيغة مع صيغة النص في الملف بالضبط.
6. **`dpi` و `figsize`** يتحكمان في جودة وحجم المخطط بشكل مستقل.

---

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| `int(pop_dict['Value'])` مع قيم عشرية | استخدم `int(float(pop_dict['Value']))` |
| نسيان `next(reader)` → أول صف بيانات هو الترويسة | دائمًا اقرأ الترويسة بـ `next(reader)` أولًا |
| `range(1, die.num_sides)` بدون `+1` | يجب `range(1, die.num_sides + 1)` ليشمل آخر وجه |
| `plt.show()` قبل `plt.title()` | ضع كل إعدادات التنسيق قبل `show()` |
| نسيان `rw.fill_walk()` بعد إنشاء الكائن | الكلاس لا يملأ النقاط تلقائيًا — `fill_walk()` إلزامية |
| استخدام `csv.reader` بدون `with open()` | الملف قد يبقى مفتوحًا — استخدم `with` دائمًا |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: بناء وتشغيل RandomWalk

> إنشاء مشي عشوائي ورسمه خطوة بخطوة.

```algorithm
1 | استيراد المكتبات | from random import choice, import matplotlib | تجهيز الأدوات
2 | تعريف الكلاس | class RandomWalk() | إنشاء بنية البيانات
3 | تهيئة الخصائص | __init__: num_points, x_values=[0], y_values=[0] | تحديد نقطة البداية
4 | تعريف fill_walk | while loop | حلقة تولّد النقاط
5 | اختيار الاتجاه | choice([1,-1]) × 2 | X و Y مستقلان
6 | اختيار المسافة | choice([0,1,2,3,4]) × 2 | مسافة 0-4 وحدات
7 | رفض الصفر | if x_step==0 and y_step==0: continue | منع الثبات
8 | حساب الموضع | next_x = x_values[-1] + x_step | إضافة تراكمية
9 | إضافة للقائمة | append(next_x), append(next_y) | تخزين النقطة
10 | إنشاء الكائن | rw = RandomWalk() | كائن بـ 5000 نقطة
11 | تشغيل المشي | rw.fill_walk() | ملء القوائم
12 | الرسم | plt.scatter(...) | عرض النقاط
```

#### نقاط التنفيذ:
- `fill_walk()` يجب استدعاؤها بعد إنشاء الكائن.
- `x_values[-1]` دائمًا الموضع الحالي — لا تستخدم index ثابتًا.

---

#### ⚙️ الخطوات / الخوارزمية: تحليل رمي النرد

> رمي النرد عدة مرات، تحليل التكرار، ورسم مدرج تكراري.

```algorithm
1 | إنشاء النرد | die = Die() أو Die(N) | نرد 6 أو N أوجه
2 | رمي N مرة | for i in range(N): results.append(die.roll()) | تجميع النتائج
3 | حساب التكرار | for value in range(1, num_sides+1) | تكرار كل وجه
4 | count كل قيمة | results.count(value) | عدّ الظهور
5 | إضافة للقائمة | frequencies.append(frequency) | حفظ التكرار
6 | إنشاء مخطط | hist = pygal.Bar() | كائن المخطط
7 | ضبط العناوين | hist.title, x_labels, x_title, y_title | تنسيق المخطط
8 | إضافة البيانات | hist.add('D6', frequencies) | ربط البيانات
9 | العرض/الحفظ | render_to_file() أو render_in_browser() | إخراج المخطط
```

#### نقاط التنفيذ:
- `range(1, die.num_sides + 1)` ضروري لتضمين الوجه الأخير.
- عدد `x_labels` يجب أن يساوي عدد `frequencies`.

---

#### ⚙️ الخطوات / الخوارزمية: قراءة وتحليل ملف CSV

> قراءة ملف بيانات، استخراج أعمدة محددة، ورسم مخطط زمني.

```algorithm
1 | استيراد المكتبات | import csv, from datetime import datetime | الأدوات المطلوبة
2 | فتح الملف | with open(filename) as f | فتح آمن
3 | إنشاء reader | reader = csv.reader(f) | كائن القراءة
4 | قراءة الترويسة | header_row = next(reader) | تخطي الصف الأول
5 | تكرار الصفوف | for row in reader | قراءة بيانات
6 | تحليل التاريخ | datetime.strptime(row[0], "%m/%d/%Y") | تحويل نص لتاريخ
7 | استخراج الأعمدة | int(row[2]) | تحويل نص لرقم
8 | الرسم | plt.plot(dates, highs) | مخطط زمني
9 | تنسيق التواريخ | fig.autofmt_xdate() | إمالة التسميات
```

#### نقاط التنفيذ:
- صيغة `strptime` يجب أن تطابق صيغة التاريخ في الملف بالضبط.
- استخدم `enumerate(header_row)` لمعرفة أرقام الأعمدة قبل كتابة الكود.

---

#### ⚙️ الخطوات / الخوارزمية: رسم خريطة السكان العالمية

> قراءة JSON، تحويل أسماء الدول لرموز ISO، ورسم خريطة ملوّنة.

```algorithm
1 | قراءة JSON | json.load(f) | تحميل بيانات السكان
2 | تصفية السنة | if pop_dict['Year'] == '2010' | اختيار سنة محددة
3 | تحويل السكان | int(float(pop_dict['Value'])) | تحويل آمن للأعداد الكبيرة
4 | الحصول على الرمز | get_country_code(country_name) | ISO code
5 | بناء القاموس | cc_populations[code] = population | ربط الرمز بالسكان
6 | (اختياري) تصنيف | 3 مجموعات حسب الحجم | ألوان مختلفة
7 | إنشاء الخريطة | wm = World() | كائن الخريطة
8 | إضافة البيانات | wm.add('2010', cc_populations) | تمرير القاموس
9 | الحفظ/العرض | render_to_file() | SVG للمتصفح
```

#### نقاط التنفيذ:
- بعض الإدخالات (مثل 'Arab World') لا تحمل رمز ISO — يجب التحقق `if code:`.
- `get_country_code` حساسة لتطابق الاسم تمامًا.

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| قراءة CSV | `with open(f) as f: reader = csv.reader(f); next(reader); for row in reader:` | أي ملف CSV |
| قراءة JSON | `with open(f) as f: data = json.load(f); for item in data: if item['key'] == value:` | أي ملف JSON |
| رسم scatter ملوّن | `plt.scatter(x, y, c=values, cmap=plt.cm.Blues, edgecolor='none', s=15)` | رسم نقاط بألوان متدرّجة |
| مدرج pygal | `hist = pygal.Bar(); hist.add('name', data); hist.render_to_file('f.svg')` | أي بيانات تكرارية |
| خريطة pygal | `wm = World(); wm.add('label', {code: value}); wm.render_to_file('f.svg')` | بيانات جغرافية |
| حلقة تفاعلية | `while True: ... if input() == 'n': break` | توليد متكرر |

---

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| قيمة JSON عشرية | `int(float(value))` | تجنب `ValueError` |
| تاريخ بصيغة مختلفة | غيّر صيغة `strptime` لتطابق الملف | الصيغة حساسة |
| دولة غير موجودة في COUNTRIES | تحقق `if code:` قبل الإضافة | تجنب `KeyError` |
| نقاط ثابتة في RandomWalk | `if x_step==0 and y_step==0: continue` | تجنب إضافة نقطة بلا حركة |
| عدة نرد بأحجام مختلفة | مرر `num_sides` للكلاس | مرونة الكلاس |

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: متوسط/صعب. التوزيع: مقارنات 20% / سيناريو كود 35% / تطبيق 30% / تتبع خوارزمية 15%.

---

### السؤال 1 (متوسط)
في كلاس `RandomWalk`، لماذا نبدأ `self.x_values = [0]` بقائمة تحتوي 0 وليس قائمة فارغة؟

أ) لأن Python لا تسمح بقوائم فارغة
ب) لأن دالة `fill_walk` تستخدم `self.x_values[-1]` لحساب الموضع الحالي
ج) لأن `choice()` تحتاج قائمة فيها عنصر واحد على الأقل
د) لتجنب خطأ `IndexError` في حلقة `while`

**الإجابة الصحيحة: ب**
**التعليل:**
- **ب ✅** `fill_walk` تحسب `next_x = self.x_values[-1] + x_step` — إذا كانت القائمة فارغة، `-1` سيُلقي `IndexError`.
- **أ ❌** Python تسمح بقوائم فارغة تمامًا.
- **ج ❌** `choice()` تعمل على قوائم مستقلة كـ `[1, -1]` لا على `x_values`.
- **د ❌** `IndexError` نعم، لكن السبب الحقيقي هو أن `[-1]` على قائمة فارغة يُلقي خطأ.

---

### السؤال 2 (متوسط)
ما الناتج المتوقع عند تشغيل `choice([1, -1]) * choice([0, 1, 2, 3, 4])` عندما تُرجع `choice` الأولى -1 والثانية 0؟

أ) -1
ب) 1
ج) 0
د) خطأ تشغيلي

**الإجابة الصحيحة: ج**
**التعليل:**
- **ج ✅** أي عدد × 0 = 0، لذا `(-1) * 0 = 0`.
- **أ ❌** هذا لو كانت الثانية 1.
- **ب ❌** هذا لو كانتا 1 و 1.
- **د ❌** لا يوجد خطأ — ضرب الأعداد الصحيحة دائمًا صحيح.

---

### السؤال 3 (صعب)
في كلاس `RandomWalk`، إذا حذفنا السطر `if x_step == 0 and y_step == 0: continue`، ماذا سيحدث؟

أ) البرنامج سيُعطي خطأ `ZeroDivisionError`
ب) الكلاس سيتجمد في حلقة لانهائية
ج) ستُضاف نقاط بنفس الإحداثيات مما يُطوّل الحلقة ويُقلل دقة المشي
د) لن يتغير شيء لأن إضافة 0 لا تُعدّل القيمة

**الإجابة الصحيحة: ج**
**التعليل:**
- **ج ✅** إذا كان x_step=0 و y_step=0، فـ `next_x = x[-1] + 0 = x[-1]` — سيتم إضافة نقطة مكررة بنفس الموضع. البرنامج سيُكمل لكن بعض "النقاط" لن تُمثّل حركة حقيقية.
- **أ ❌** لا قسمة هنا.
- **ب ❌** الحلقة ستنتهي لأن `len(x_values)` يزداد في كل حالة.
- **د ❌** التأثير موجود — تُضاف نقطة مكررة.

---

### السؤال 4 (متوسط)
ما الفرق بين `plt.figure(figsize=(10,6))` و `plt.figure(dpi=128, figsize=(10,6))`؟

أ) لا فرق — `dpi` لا تأثير له في matplotlib
ب) الأول يُحدد الحجم بالبكسل، الثاني بالإنش
ج) إضافة `dpi=128` ترفع جودة الصورة دون تغيير حجمها الفعلي بالإنش
د) `dpi` يُغير عدد النقاط على محور Y فقط

**الإجابة الصحيحة: ج**
**التعليل:**
- **ج ✅** `figsize` دائمًا بالإنش. `dpi` يُحدد عدد النقاط في كل إنش → يرفع الدقة والوضوح.
- **أ ❌** `dpi` مهم جدًا للجودة.
- **ب ❌** كلاهما بالإنش — فقط `dpi` يتحكم في الدقة.
- **د ❌** `dpi` يؤثر على المخطط كله لا على محور Y فقط.

---

### السؤال 5 (متوسط)
في كود رمي النرد، لماذا نستخدم `range(1, die.num_sides + 1)` وليس `range(die.num_sides)`؟

أ) لأن `range(die.num_sides)` تبدأ من 1
ب) لأن النرد يُنتج أرقامًا من 1 إلى 6 (لا من 0)، و `range(N)` تبدأ من 0
ج) لأن `range` لا تعمل مع `die.num_sides` مباشرة
د) لتجنب قسمة على صفر

**الإجابة الصحيحة: ب**
**التعليل:**
- **ب ✅** `range(6)` = [0,1,2,3,4,5]. النرد يُنتج 1-6 وليس 0-5، لذا `range(1, 7)` أو `range(1, die.num_sides+1)` هو الصحيح.
- **أ ❌** `range(6)` تبدأ من 0 لا 1.
- **ج ❌** `range` تعمل مع أي رقم صحيح.
- **د ❌** لا قسمة هنا.

---

### السؤال 6 (صعب)
ما الفرق بين `hist.render_to_file('die.svg')` و `hist.render_in_browser()`؟

أ) لا فرق — كلاهما ينتج نفس المخرج
ب) الأول يحفظ ملف SVG على القرص، الثاني يعرضه في المتصفح مباشرة دون حفظ دائم
ج) `render_in_browser` أبطأ لأنه يُولّد HTML وليس SVG
د) `render_to_file` يحتاج `import os`

**الإجابة الصحيحة: ب**
**التعليل:**
- **ب ✅** كلا الدالتَين تُنتجان SVG، لكن الأولى تحفظه كملف دائم بينما الثانية تفتح المتصفح مباشرة (تحفظ ملفًا مؤقتًا).
- **أ ❌** الفرق في طريقة الإخراج.
- **ج ❌** كلاهما SVG.
- **د ❌** لا تحتاج `import os`.

---

### السؤال 7 (صعب)
لماذا يجب استخدام `int(float(pop_dict['Value']))` بدل `int(pop_dict['Value'])` لبعض قيم JSON؟

أ) لأن `json.load` يُرجع دائمًا `float` وليس `str`
ب) لأن بعض قيم السكان مخزّنة كنصوص تحتوي نقطة عشرية مثل `'1127437398.85751'`
ج) لأن `int('1127437398')` يُلقي `OverflowError`
د) لأن Python تُطلب تحويلًا مزدوجًا لأي رقم أكبر من مليون

**الإجابة الصحيحة: ب**
**التعليل:**
- **ب ✅** `int('1127437398.85751')` يُلقي `ValueError` لأن النص يحتوي نقطة. `float(...)` يقبل النقطة ثم `int(float(...))` يحذفها.
- **أ ❌** `json.load` يُرجع نصوصًا لأن القيم في الملف محاطة بعلامات اقتباس.
- **ج ❌** Python تدعم أعدادًا كبيرة جدًا.
- **د ❌** لا توجد قاعدة كهذه.

---

### السؤال 8 (متوسط)
ما وظيفة `next(reader)` في كود قراءة CSV؟

أ) تُعيد قراءة الملف من البداية
ب) تقرأ صفًّا واحدًا فقط (الترويسة) وتتقدم مؤشر القراءة
ج) تُحوّل `reader` من `iterator` إلى `list`
د) تتحقق من وجود الملف وتُرجع True أو False

**الإجابة الصحيحة: ب**
**التعليل:**
- **ب ✅** `next()` يستدعي `__next__()` على الـ iterator — يُرجع الصف الحالي ويُحرّك المؤشر للتالي.
- **أ ❌** لا تُعيد من البداية.
- **ج ❌** يُرجع صفًّا واحدًا (قائمة) لا قائمة كاملة.
- **د ❌** هذا دور `os.path.exists()`.

---

### السؤال 9 (صعب)
ما وظيفة `datetime.strptime(row[0], "%m/%d/%Y")`؟

أ) تُنسّق كائن `datetime` موجود لنص بالصيغة المحددة
ب) تُحوّل نص التاريخ (مثل '07/01/2014') إلى كائن `datetime` قابل للرسم
ج) تُولّد قائمة بجميع تواريخ الشهر
د) تُحسب الفرق الزمني بين تاريخَين

**الإجابة الصحيحة: ب**
**التعليل:**
- **ب ✅** `strptime` = "string parse time" — تُحوّل نصًّا لكائن `datetime`. الصيغة تُخبرها بترتيب الأجزاء.
- **أ ❌** هذا دور `strftime` (format).
- **ج ❌** تُعطي كائن `datetime` واحدًا.
- **د ❌** الطرح بين كائنَي `datetime` يُعطي الفرق.

---

### السؤال 10 (متوسط)
ما الغرض من `fig.autofmt_xdate()` في مخططات التواريخ؟

أ) تُحوّل محور X من أعداد لتواريخ
ب) تُميل تسميات محور X لتجنب التداخل عند كثافتها
ج) تُطبّق `strptime` تلقائيًا على محور X
د) تُخفي محور X تمامًا

**الإجابة الصحيحة: ب**
**التعليل:**
- **ب ✅** عند كثرة التواريخ على محور X، تتداخل التسميات — `autofmt_xdate()` يُميلها لتُقرأ بوضوح.
- **أ ❌** تحويل التواريخ يتم بـ `strptime` يدويًا.
- **ج ❌** `autofmt_xdate` للتنسيق البصري فقط.
- **د ❌** لا تُخفي المحور.

---

### السؤال 11 (صعب)
لماذا تُعطي `get_country_code('Arab World')` النتيجة `None`؟

أ) لأن pygal لا يدعم اللغة العربية
ب) لأن 'Arab World' منطقة جغرافية وليست دولة — لا يوجد لها رمز ISO
ج) لأن اسم الدولة يجب أن يبدأ بحرف كبير
د) لأن `COUNTRIES` تحتوي فقط الدول الأوروبية

**الإجابة الصحيحة: ب**
**التعليل:**
- **ب ✅** `COUNTRIES` تحتوي رموز ISO للدول المعترف بها فقط. المناطق الإحصائية مثل 'Arab World'، 'Caribbean small states' ليست دولًا.
- **أ ❌** المشكلة في البنية لا في اللغة.
- **ج ❌** كل أسماء `COUNTRIES` تبدأ بحرف كبير.
- **د ❌** `COUNTRIES` يحتوي دول العالم كله.

---

### السؤال 12 (متوسط)
عند رمي نردَين D6 معًا 1000 مرة، أي رقم يتوقع أن يظهر بأعلى تكرار؟

أ) 2
ب) 7
ج) 12
د) 6

**الإجابة الصحيحة: ب**
**التعليل:**
- **ب ✅** مجموع 7 يمكن الحصول عليه بـ 6 طرق: (1+6, 2+5, 3+4, 4+3, 5+2, 6+1) = 6/36 = 1/6.
- **أ ❌** 2 يحدث بطريقة واحدة فقط: (1+1) = 1/36.
- **ج ❌** 12 يحدث بطريقة واحدة: (6+6) = 1/36.
- **د ❌** 6 و 8 يحدثان بـ 5 طرق = 5/36 < 6/36.

---

### السؤال 13 (صعب)
ما الفرق بين `plt.plot(highs, c='red')` و `plt.scatter(rw.x_values, rw.y_values, c=rw.y_values)`؟

أ) `plot` أسرع من `scatter`
ب) `plot` يرسم خطًّا متصلًا بلون واحد، `scatter` يرسم نقاطًا يمكن تلوين كل منها بلون مختلف
ج) `scatter` لا يدعم معامل `c` في matplotlib
د) `plot` يحتاج قائمتَين (X, Y) بينما `scatter` يحتاج قائمة واحدة

**الإجابة الصحيحة: ب**
**التعليل:**
- **ب ✅** الفرق الجوهري: `plot` يصل النقاط بخط، `scatter` يرسمها منفصلة. في `scatter`، `c=قائمة` يُلوّن كل نقطة حسب قيمتها.
- **أ ❌** الأداء ليس المعيار هنا.
- **ج ❌** `scatter` يدعم `c=قائمة` تمامًا.
- **د ❌** كلاهما يقبل قائمتَين X و Y.

---

### السؤال 14 (متوسط)
في `plt.fill_between(dates, highs, lows, facecolor='green', alpha=0.1)`، ماذا يعني `alpha=0.1`؟

أ) اللون الأخضر بشدة 10% (شفاف 90%)
ب) عرض الخط 0.1 نقطة
ج) الرسم يبدأ من العنصر رقم 0.1
د) 10 طبقات من اللون الأخضر

**الإجابة الصحيحة: أ**
**التعليل:**
- **أ ✅** `alpha` في matplotlib هو الشفافية: 0 = شفاف تمامًا، 1 = معتم تمامًا. 0.1 = شفافية عالية (يُرى ما تحته).
- **ب ❌** عرض الخط يُحدد بـ `linewidth`.
- **ج ❌** لا معنى لهذا.
- **د ❌** `alpha` ليس عدد طبقات.

---

### السؤال 15 (صعب)
في `cc_populations[code] = population`، لماذا نبني قاموسًا `{code: population}` بدل قائمة `[(code, population)]`؟

أ) `pygal World` يقبل قوائم فقط
ب) القاموس يضمن عدم تكرار نفس الرمز، و `pygal World` يتوقع قاموسًا `{code: value}`
ج) القوائم بطيئة جدًا في Python
د) الرموز حرفية لا يمكن جعلها مفاتيح

**الإجابة الصحيحة: ب**
**التعليل:**
- **ب ✅** `wm.add('2010', cc_populations)` يتوقع `dict` — كل مفتاح رمز دولة وكل قيمة عدد السكان. القاموس أيضًا يضمن رمزًا واحدًا لكل دولة.
- **أ ❌** `pygal World` يقبل `dict` لا قائمة.
- **ج ❌** الأداء ليس السبب.
- **د ❌** الرموز نصوص وهي أكثر أنواع المفاتيح شيوعًا في Python.

---

### السؤال 16 (صعب)
إذا أردنا إنشاء نرد D20 ورمْيه 10,000 مرة، ما الكود الصحيح؟

أ)
```python
die = Die(20)
for i in range(10000): results.append(die.roll())
for v in range(1, 21): frequencies.append(results.count(v))
```

ب)
```python
die = Die(20)
for i in range(10000): results.append(die.roll())
for v in range(20): frequencies.append(results.count(v))
```

ج)
```python
die = Die()
die.num_sides = 20
for i in range(10000): results.append(die.roll())
for v in range(1, 20): frequencies.append(results.count(v))
```

د)
```python
die = Die(20)
results = [die.roll() for i in range(10000)]
for v in range(0, 20): frequencies.append(results.count(v))
```

**الإجابة الصحيحة: أ**
**التعليل:**
- **أ ✅** `Die(20)` ينشئ نردًا 20 وجهًا. `range(1, 21)` يُغطي 1 إلى 20 شاملًا. الكود كامل وصحيح.
- **ب ❌** `range(20)` = 0 إلى 19 — يُفوّت الوجه 20 ويُحسب الوجه 0 (غير موجود).
- **ج ❌** `range(1, 20)` يُفوّت الوجه 20 (يصل إلى 19 فقط).
- **د ❌** `range(0, 20)` يبدأ من 0 وهو وجه غير موجود في النرد.

---

## الجزء الرابع: أسئلة تصحيح الكود

> غطِّ أنواع الأخطاء: منطقية، سوء فهم، dead code، off_by_one.

---

### سؤال تصحيح 1 — نوع: `off_by_one`

**الكود (يحتوي خطأ):**
```python
from die import Die

die = Die()
results = []
for roll_num in range(1000):
    results.append(die.roll())

frequencies = []
for value in range(die.num_sides):   # ERROR HERE
    frequencies.append(results.count(value))
```

**اكتشف الخطأ:** `range(die.num_sides)` = `range(6)` = [0,1,2,3,4,5] — يُحسب الوجه 0 (غير موجود) ويُفوّت الوجه 6.

**التصحيح:**
```python
from die import Die

die = Die()
results = []
for roll_num in range(1000):
    results.append(die.roll())

frequencies = []
for value in range(1, die.num_sides + 1):   # FIXED: 1 to 6 inclusive
    frequencies.append(results.count(value))
```

**شرح الحل:**
1. `die.roll()` يُرجع 1 إلى 6 (لا 0 إلى 5).
2. `range(6)` = 0,1,2,3,4,5 — يُفوّت 6 ويُحسب 0.
3. `range(1, 7)` أو `range(1, die.num_sides + 1)` هو الصحيح.

---

### سؤال تصحيح 2 — نوع: `logic`

**الكود (يحتوي خطأ):**
```python
import csv

filename = 'sitka_weather_07-2014.csv'
with open(filename) as f:
    reader = csv.reader(f)
    highs = []
    for row in reader:         # ERROR: no header skip
        high = int(row[2])
        highs.append(high)
```

**اكتشف الخطأ:** غياب `next(reader)` — أول صف هو الترويسة ('Mean TemperatureF') وليس رقمًا، فـ `int('Mean TemperatureF')` يُلقي `ValueError`.

**التصحيح:**
```python
import csv

filename = 'sitka_weather_07-2014.csv'
with open(filename) as f:
    reader = csv.reader(f)
    header_row = next(reader)  # FIXED: skip header row
    highs = []
    for row in reader:
        high = int(row[2])
        highs.append(high)
```

**شرح الحل:**
1. أول صف في أي CSV هو الترويسة وليس بيانات.
2. `next(reader)` يقرأ الصف الأول ويُحرّك المؤشر — باقي الصفوف هي البيانات.
3. بدونه، الكود يُحاول تحويل نص عمود كـ 'Mean TemperatureF' لعدد صحيح → `ValueError`.

---

### سؤال تصحيح 3 — نوع: `misconception`

**الكود (يحتوي خطأ):**
```python
import json

filename = 'population_data.json'
with open(filename) as f:
    pop_data = json.load(f)

for pop_dict in pop_data:
    if pop_dict['Year'] == '2010':
        country_name = pop_dict['Country Name']
        population = int(pop_dict['Value'])   # ERROR for decimal strings
        print(country_name, population)
```

**اكتشف الخطأ:** `int(pop_dict['Value'])` يفشل عندما تكون القيمة نصًّا يحتوي نقطة عشرية مثل `'1127437398.85751'`.

**التصحيح:**
```python
import json

filename = 'population_data.json'
with open(filename) as f:
    pop_data = json.load(f)

for pop_dict in pop_data:
    if pop_dict['Year'] == '2010':
        country_name = pop_dict['Country Name']
        population = int(float(pop_dict['Value']))  # FIXED: float first
        print(country_name, population)
```

**شرح الحل:**
1. بعض قيم JSON للسكان مخزّنة كأعداد عشرية في نص.
2. `int('1127437398.85751')` يُلقي `ValueError`.
3. `float('1127437398.85751')` → `1127437398.85751` → `int(...)` → `1127437398`.

---

### سؤال تصحيح 4 — نوع: `dead_code`

**الكود (يحتوي خطأ):**
```python
from random import choice

class RandomWalk():
    def __init__(self, num_points=5000):
        self.num_points = num_points
        self.x_values = [0]
        self.y_values = [0]

    def fill_walk(self):
        while len(self.x_values) < self.num_points:
            x_direction = choice([1, -1])
            x_distance = choice([0, 1, 2, 3, 4])
            x_step = x_direction * x_distance

            y_direction = choice([1, -1])
            y_distance = choice([0, 1, 2, 3, 4])
            y_step = y_direction * y_distance

            next_x = self.x_values[-1] + x_step   # ERROR: missing zero-step check
            next_y = self.y_values[-1] + y_step
            self.x_values.append(next_x)
            self.y_values.append(next_y)
```

**اكتشف الخطأ:** غياب `if x_step == 0 and y_step == 0: continue` — ستُضاف نقاط بنفس الإحداثيات بدون حركة فعلية.

**التصحيح:**
```python
    def fill_walk(self):
        while len(self.x_values) < self.num_points:
            x_direction = choice([1, -1])
            x_distance = choice([0, 1, 2, 3, 4])
            x_step = x_direction * x_distance

            y_direction = choice([1, -1])
            y_distance = choice([0, 1, 2, 3, 4])
            y_step = y_direction * y_distance

            # FIXED: reject stationary moves
            if x_step == 0 and y_step == 0:
                continue

            next_x = self.x_values[-1] + x_step
            next_y = self.y_values[-1] + y_step
            self.x_values.append(next_x)
            self.y_values.append(next_y)
```

**شرح الحل:**
1. `choice([0,1,2,3,4])` يمكن أن يُرجع 0 لكلا المحورَين في نفس الوقت.
2. عندها `x_step = 1×0 = 0` و `y_step = -1×0 = 0` → لا حركة.
3. الفحص `if x_step == 0 and y_step == 0: continue` يتخطى هذه الحالة.

---

### سؤال تصحيح 5 — نوع: `syntax/logic`

**الكود (يحتوي خطأ):**
```python
import json
from pygal_maps_world.maps import World

filename = 'population_data.json'
with open(filename) as f:
    pop_data = json.load(f)

cc_populations = {}
for pop_dict in pop_data:
    if pop_dict['Year'] == 2010:     # ERROR: wrong type comparison
        country_name = pop_dict['Country Name']
        population = int(float(pop_dict['Value']))
        code = get_country_code(country_name)
        if code:
            cc_populations[code] = population
```

**اكتشف الخطأ:** `pop_dict['Year'] == 2010` — المقارنة بعدد صحيح (`int`) بينما القيمة في JSON نص (`'2010'`). ستُرجع الشرط `False` دائمًا.

**التصحيح:**
```python
    if pop_dict['Year'] == '2010':   # FIXED: compare with string
```

**شرح الحل:**
1. في ملف JSON، `"Year": "2010"` — القيمة نص وليست رقمًا.
2. `'2010' == 2010` في Python يُرجع `False` (لا تحويل تلقائي).
3. يجب المقارنة بنص: `== '2010'`.

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

---

### تمرين 1 (تمرين إضافي): نرد D12 مع pygal — `code_fix`

**السيناريو / المطلوب:**
أكمل الكود التالي لإنشاء نرد 12 وجهًا ورمْيه 5000 مرة وعرض النتائج:

```python
from die import Die
import pygal

die = Die(_____)           # (1) نرد 12 وجهًا

results = []
for roll_num in range(_____):   # (2) 5000 مرة
    results.append(die.roll())

frequencies = []
for value in range(_____, die.num_sides + 1):  # (3) من 1 إلى 12
    frequencies.append(results.count(value))

hist = pygal.Bar()
hist.title = "_____"                              # (4) عنوان مناسب
hist.x_labels = [str(i) for i in range(1, _____)]  # (5) من 1 إلى 12
hist.add('D12', frequencies)
hist.render_in_browser()
```

**المطلوب:** أملأ الفراغات (1) إلى (5).

**نموذج الحل:**
1. `Die(12)`
2. `range(5000)`
3. `range(1, die.num_sides + 1)` → `range(1, 13)`
4. `"Results of rolling one D12 5000 times."`
5. `range(1, 13)` → ينتج `['1','2',...,'12']`

```python
from die import Die
import pygal

die = Die(12)
results = []
for roll_num in range(5000):
    results.append(die.roll())

frequencies = []
for value in range(1, die.num_sides + 1):
    frequencies.append(results.count(value))

hist = pygal.Bar()
hist.title = "Results of rolling one D12 5000 times."
hist.x_labels = [str(i) for i in range(1, 13)]
hist.add('D12', frequencies)
hist.render_in_browser()
```

---

### تمرين 2 (تمرين إضافي): RandomWalk مع تمييز البداية والنهاية — `fill_gaps`

**السيناريو / المطلوب:**
اكتب كود يرسم مشيًا عشوائيًا بـ 3000 نقطة مع تمييز نقطة البداية باللون الأخضر ونقطة النهاية باللون الأحمر وتلوين باقي النقاط بالتدرج الأزرق.

**نموذج الحل:**

```python
import matplotlib.pyplot as plt
from random_walk import RandomWalk

rw = RandomWalk(3000)    # 3000 points
rw.fill_walk()

plt.figure(dpi=128, figsize=(10, 6))

# Color all points by step number using Blue colormap
point_numbers = list(range(rw.num_points))
plt.scatter(rw.x_values, rw.y_values,
            c=point_numbers, cmap=plt.cm.Blues,
            edgecolor='none', s=15)

# Highlight start (green) and end (red)
plt.scatter(0, 0, c='green', edgecolors='none', s=100)
plt.scatter(rw.x_values[-1], rw.y_values[-1],
            c='red', edgecolors='none', s=100)

plt.show()
```

---

### تمرين 3 (تمرين إضافي): قراءة درجات الحرارة الدنيا — `scenario`

**السيناريو / المطلوب:**
عندك ملف CSV للطقس به عمود في الموضع 4 يحتوي درجات الحرارة الدنيا. اكتب كود يقرأ الملف ويرسم الحرارات الدنيا بخط أزرق.

**نموذج الحل:**

```python
import csv
from datetime import datetime
from matplotlib import pyplot as plt

filename = 'sitka_weather_2014.csv'
with open(filename) as f:
    reader = csv.reader(f)
    header_row = next(reader)   # skip header

    dates, lows = [], []
    for row in reader:
        current_date = datetime.strptime(row[1], "%Y-%m-%d")
        dates.append(current_date)
        low = int(row[4])       # column 4 = Min Temperature
        lows.append(low)

fig = plt.figure(dpi=128, figsize=(10, 6))
plt.plot(dates, lows, c='blue')
plt.title("Daily low temperatures 2014", fontsize=24)
fig.autofmt_xdate()
plt.ylabel("Temperature (F)", fontsize=16)
plt.show()
```

---

### تمرين 4 (تمرين إضافي): خريطة قارة آسيا — `scenario`

**السيناريو / المطلوب:**
ارسم خريطة عالمية تُلوّن دول آسيا باللون الأحمر والدول الأوروبية باللون الأزرق.

**نموذج الحل:**

```python
from pygal_maps_world.maps import World

wm = World()
wm.title = 'Asia and Europe'

wm.add('Asia', ['cn', 'in', 'jp', 'sa', 'ir', 'iq', 'sy', 'jo', 'ae', 'pk', 'bd', 'vn', 'th', 'id', 'my'])
wm.add('Europe', ['de', 'fr', 'gb', 'it', 'es', 'pl', 'nl', 'se', 'no', 'fi', 'pt', 'be', 'at', 'ch', 'gr'])

wm.render_in_browser()
```

---

### تمرين 5 (تمرين إضافي): فحص RandomWalk — `code_fix`

**السيناريو / المطلوب:**
الكود التالي يُنشئ `RandomWalk` لكنه لا يعمل. اكتشف الخطأ وصحّحه:

```python
import matplotlib.pyplot as plt
from random_walk import RandomWalk

rw = RandomWalk(1000)
# rw.fill_walk() -- commented out by mistake
plt.scatter(rw.x_values, rw.y_values)
plt.show()
```

**نموذج الحل:**

```python
import matplotlib.pyplot as plt
from random_walk import RandomWalk

rw = RandomWalk(1000)
rw.fill_walk()          # FIXED: must call fill_walk() to generate points
plt.scatter(rw.x_values, rw.y_values)
plt.show()
```

**الخطأ:** `fill_walk()` لم تُستدعَ — `x_values` و `y_values` يحتويان نقطة واحدة فقط (0,0)، فيُرسم نقطة واحدة فقط.

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

---

### تمرين 1: تحليل توزيع النرد

**السيناريو:**
شركة ألعاب تريد التحقق من عدالة نرد جديد بـ 8 أوجه — تريد ضمان أن كل وجه يظهر بنفس الاحتمالية (1/8 = 12.5%) عند 10,000 رمية.

**المطلوب:**
1. صِف كيف تعدّل الكود الحالي لنرد 8 أوجه.
2. ما النطاق المقبول للتكرار (± 5% من 10,000÷8 = 1250)؟
3. لماذا نرمي 10,000 مرة بدل 100؟

**نموذج الحل:**
1. `die = Die(8)` — `range(1, 9)` — `x_labels = ['1','2','3','4','5','6','7','8']`.
2. 1250 × (1 ± 0.05) → النطاق المقبول: 1187 إلى 1312.
3. كلما زاد عدد الرميات، اقترب التوزيع من النظري (قانون الأعداد الكبيرة) — 100 رمية عشوائية جدًا.

---

### تمرين 2: تحليل بيانات CSV جديدة

**السيناريو:**
لديك ملف CSV لأسعار أسهم شركة بالشكل: `Date, Open, High, Low, Close, Volume`. تريد رسم سعر الإغلاق عبر الزمن.

**المطلوب:**
1. ما رقم العمود الذي تستخدمه؟
2. ما صيغة التاريخ إذا كان `"2024-01-15"`؟
3. ما الدالة التي تُميل تسميات التواريخ؟

**نموذج الحل:**
1. العمود رقم 4 (`row[4]` = Close).
2. `datetime.strptime(row[0], "%Y-%m-%d")`.
3. `fig.autofmt_xdate()`.

---

### تمرين 3: تصميم خريطة سكانية للشرق الأوسط

**السيناريو:**
تريد رسم خريطة تُظهر دول الشرق الأوسط مقسّمة حسب عدد السكان (3 فئات: أقل من 5M، 5M-50M، أكثر من 50M).

**المطلوب:**
1. ما البيانات التي تحتاجها؟
2. صِف هيكل القواميس الثلاثة.
3. ما الدالة التي تحوّل اسم الدولة لرمز pygal؟

**نموذج الحل:**
1. قائمة بأسماء الدول وعدد سكانها (JSON أو CSV).
2. `cc_pops_1 = {'bh': 1500000, 'qa': 2800000, ...}` / `cc_pops_2 = {'jo': 10000000, ...}` / `cc_pops_3 = {'eg': 100000000, ...}`.
3. `get_country_code(country_name)` من ملف `country_codes.py`.

---

### تمرين 4: مقارنة matplotlib و pygal

**السيناريو:**
مطوّر يسأل متى يستخدم `matplotlib` ومتى يستخدم `pygal` لمشروع تحليل بيانات.

**نموذج الحل:**

| المعيار | `matplotlib` | `pygal` |
| --- | --- | --- |
| نوع المخرج | صورة (PNG/PDF) أو نافذة | SVG تفاعلي |
| التفاعل | محدود (بدون مكتبات إضافية) | تفاعلي (Hover, tooltips) |
| الاستخدام المثالي | تقارير، PDF، علمي | مواقع ويب، عروض تقديمية |
| الخرائط | يحتاج Basemap/geopandas | World map مدمج |
| التخصيص | واسع جدًا | محدود نسبيًا |

---

## الجزء الرابع: تمارين تتبع التنفيذ

---

### تمرين تتبع 1: تتبع fill_walk

**المدخل:**
```python
rw = RandomWalk(num_points=4)
# Assume: choice() returns in sequence:
# x_dir=1, x_dist=2, y_dir=-1, y_dist=1  --> step 1
# x_dir=-1, x_dist=0, y_dir=1, y_dist=3  --> step 2 (zero x, non-zero y)
# x_dir=1, x_dist=0, y_dir=-1, y_dist=0  --> step 3 (skip: both zero)
# x_dir=1, x_dist=3, y_dir=1, y_dist=2   --> step 4
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| التكرار | x_step | y_step | تخطى؟ | x_values | y_values |
| --- | --- | --- | --- | --- | --- |
| البداية | — | — | — | [0] | [0] |
| 1 | ؟ | ؟ | ؟ | ؟ | ؟ |
| 2 | ؟ | ؟ | ؟ | ؟ | ؟ |
| 3 | ؟ | ؟ | ؟ | ؟ | ؟ |
| 4 | ؟ | ؟ | ؟ | ؟ | ؟ |

**نموذج الحل:**

| التكرار | x_step | y_step | تخطى؟ | x_values | y_values |
| --- | --- | --- | --- | --- | --- |
| البداية | — | — | — | [0] | [0] |
| 1 | 1×2=2 | -1×1=-1 | لا | [0, 2] | [0, -1] |
| 2 | -1×0=0 | 1×3=3 | لا | [0, 2, 2] | [0, -1, 2] |
| 3 | 1×0=0 | -1×0=0 | نعم (تخطى) | [0, 2, 2] | [0, -1, 2] |
| 4 | 1×3=3 | 1×2=2 | لا | [0, 2, 2, 5] | [0, -1, 2, 4] |

**النتيجة:** `x_values = [0, 2, 2, 5]`, `y_values = [0, -1, 2, 4]` — 4 نقاط، التكرار 3 تخطّى.

---

### تمرين تتبع 2: تتبع تحليل النرد

**المدخل:**
```python
results = [3, 1, 6, 2, 3, 6, 1, 4, 3, 6]
die = Die()  # 6 sides
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| الوجه (value) | results.count(value) | التكرار |
| --- | --- | --- |
| 1 | ؟ | ؟ |
| 2 | ؟ | ؟ |
| 3 | ؟ | ؟ |
| 4 | ؟ | ؟ |
| 5 | ؟ | ؟ |
| 6 | ؟ | ؟ |

**نموذج الحل:**

| الوجه (value) | results.count(value) | التكرار |
| --- | --- | --- |
| 1 | 2 | 2 |
| 2 | 1 | 1 |
| 3 | 3 | 3 |
| 4 | 1 | 1 |
| 5 | 0 | 0 |
| 6 | 3 | 3 |

**النتيجة:** `frequencies = [2, 1, 3, 1, 0, 3]`

---

### تمرين تتبع 3: تتبع قراءة CSV

**المدخل:**
ملف CSV يحتوي 3 صفوف:
```
AKDT,Max TemperatureF,Mean TemperatureF
2014-07-01,75,64
2014-07-02,82,71
2014-07-03,78,64
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| الخطوة | العملية | قيمة `row` أو المتغير |
| --- | --- | --- |
| 1 | `reader = csv.reader(f)` | reader object |
| 2 | `header_row = next(reader)` | ؟ |
| 3 | تكرار 1: `for row in reader` | ؟ |
| 4 | `high = int(row[2])` | ؟ |
| 5 | تكرار 2 | ؟ |
| 6 | `high = int(row[2])` | ؟ |
| 7 | تكرار 3 | ؟ |
| 8 | `high = int(row[2])` | ؟ |

**نموذج الحل:**

| الخطوة | العملية | قيمة `row` أو المتغير |
| --- | --- | --- |
| 1 | `reader = csv.reader(f)` | csv.reader object |
| 2 | `header_row = next(reader)` | `['AKDT', 'Max TemperatureF', 'Mean TemperatureF']` |
| 3 | تكرار 1 | `['2014-07-01', '75', '64']` |
| 4 | `int(row[2])` | `64` |
| 5 | تكرار 2 | `['2014-07-02', '82', '71']` |
| 6 | `int(row[2])` | `71` |
| 7 | تكرار 3 | `['2014-07-03', '78', '64']` |
| 8 | `int(row[2])` | `64` |

**النتيجة:** `highs = [64, 71, 64]`

---

## الجزء الرابع: أسئلة تصميم

---

### سؤال تصميم 1: تصميم كلاس WeatherAnalyzer

**المطلوب:**
صمّم كلاس `WeatherAnalyzer` يقرأ ملف CSV للطقس ويوفّر دوالًا لتحليل البيانات. ارسم مخطط UML للكلاس.

**نموذج الإجابة:**

#### 📊 المخطط: WeatherAnalyzer Class Design

#### ما هذا المخطط؟
> يوضّح بنية كلاس تحليل الطقس — خصائصه ودوالّه وعلاقاته.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | WeatherAnalyzer | class | الكلاس الرئيسي |
| 2 | `__init__(filename)` | method | تهيئة وقراءة الملف |
| 3 | `load_data()` | method | قراءة CSV وتخزين البيانات |
| 4 | `get_highs()` | method | إرجاع قائمة درجات الحرارة العليا |
| 5 | `get_lows()` | method | إرجاع قائمة درجات الحرارة الدنيا |
| 6 | `plot_temperatures()` | method | رسم المخطط |
| 7 | `filename` | attribute | مسار الملف |
| 8 | `dates` | attribute | قائمة التواريخ |
| 9 | `highs` | attribute | قائمة الحرارات العليا |
| 10 | `lows` | attribute | قائمة الحرارات الدنيا |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| WeatherAnalyzer | `__init__` | يستدعي | استدعاء | عند الإنشاء |
| `__init__` | `load_data` | يستدعي | استدعاء | تحميل البيانات |
| WeatherAnalyzer | csv | يستخدم | dependency | قراءة الملف |
| WeatherAnalyzer | datetime | يستخدم | dependency | تحليل التواريخ |

```diagram
type: class
title: WeatherAnalyzer Class
direction: TD
nodes:
  - id: wa
    label: "WeatherAnalyzer\n---\n+ filename: str\n+ dates: list\n+ highs: list\n+ lows: list\n---\n+ __init__(filename)\n+ load_data()\n+ get_highs(): list\n+ get_lows(): list\n+ plot_temperatures()"
    kind: process
    level: 0
  - id: csv_mod
    label: csv module
    kind: event
    level: 1
  - id: dt_mod
    label: datetime module
    kind: event
    level: 1
edges:
  - from: wa
    to: csv_mod
    label: uses
  - from: wa
    to: dt_mod
    label: uses
```

**معايير التقييم:**
- الكلاس يحتوي `__init__` يقبل اسم الملف.
- `load_data()` تستخدم `csv.reader` و `next(reader)` و `datetime.strptime`.
- الدوال تُرجع القوائم المخزّنة وليس قوائم جديدة في كل مرة.
- `plot_temperatures()` تستخدم `fill_between` لتظليل النطاق.

---

### سؤال تصميم 2: تصميم نظام محاكاة نرد متعدد

**المطلوب:**
صمّم `flowchart` يوضّح منطق برنامج يُتيح للمستخدم اختيار عدد النرد (1 أو 2)، نوع كل نرد (6، 10، 12 وجهًا)، عدد الرميات، ثم يرسم النتائج.

**نموذج الإجابة:**

#### 📊 المخطط: Die Simulation Flowchart

#### ما هذا المخطط؟
> يوضّح تدفق قرارات برنامج محاكاة النرد المتعدد من الإدخال حتى عرض المخطط.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | بداية | event | بداية البرنامج |
| 2 | أدخل عدد النرد | process | input: 1 أو 2 |
| 3 | أدخل نوع النرد | process | input: 6, 10, 12 |
| 4 | أدخل عدد الرميات | process | input: 100 - 100000 |
| 5 | عدد النرد = 2؟ | decision | تفرّع |
| 6 | رمي نرد واحد | process | results.append(die.roll()) |
| 7 | رمي نردَين وجمع | process | results.append(die1.roll()+die2.roll()) |
| 8 | حساب التكرار | process | results.count(v) |
| 9 | رسم pygal.Bar | process | render_in_browser |
| 10 | نهاية | event | |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| بداية | أدخل عدد النرد | → | عادي | |
| أدخل عدد النرد | أدخل نوع النرد | → | عادي | |
| أدخل نوع النرد | أدخل عدد الرميات | → | عادي | |
| أدخل عدد الرميات | عدد النرد = 2؟ | → | عادي | |
| عدد النرد = 2؟ | رمي نرد واحد | لا | مشروط | |
| عدد النرد = 2؟ | رمي نردَين وجمع | نعم | مشروط | |
| رمي نرد واحد | حساب التكرار | → | عادي | |
| رمي نردَين وجمع | حساب التكرار | → | عادي | |
| حساب التكرار | رسم pygal.Bar | → | عادي | |
| رسم pygal.Bar | نهاية | → | عادي | |

```diagram
type: flowchart
title: Die Simulation Program Flow
direction: TD
nodes:
  - id: start
    label: بداية
    kind: event
    level: 0
  - id: input_count
    label: أدخل عدد النرد (1 أو 2)
    kind: process
    level: 1
  - id: input_type
    label: أدخل نوع النرد (6/10/12)
    kind: process
    level: 2
  - id: input_rolls
    label: أدخل عدد الرميات
    kind: process
    level: 3
  - id: check
    label: عدد النرد = 2؟
    kind: decision
    level: 4
  - id: one_die
    label: رمي نرد واحد
    kind: process
    level: 5
  - id: two_dice
    label: رمي نردَين وجمع
    kind: process
    level: 5
  - id: freq
    label: حساب التكرار
    kind: process
    level: 6
  - id: chart
    label: رسم pygal.Bar
    kind: process
    level: 7
  - id: end
    label: نهاية
    kind: event
    level: 8
edges:
  - from: start
    to: input_count
  - from: input_count
    to: input_type
  - from: input_type
    to: input_rolls
  - from: input_rolls
    to: check
  - from: check
    to: one_die
    label: لا
  - from: check
    to: two_dice
    label: نعم
  - from: one_die
    to: freq
  - from: two_dice
    to: freq
  - from: freq
    to: chart
  - from: chart
    to: end
```

**معايير التقييم:**
- وجود نقطة قرار واضحة لعدد النرد.
- مسارَان منفصلان (1 نرد / 2 نرد) يلتقيان عند حساب التكرار.
- جميع خطوات الإدخال موجودة.
- النهاية نقطة واحدة.

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما الكلاس الذي يُولّد مشيًا عشوائيًا ويبدأ من (0,0)؟
A: `RandomWalk` — يُهيّأ بـ `x_values=[0]` و `y_values=[0]`، وتُولّد النقاط عبر `fill_walk()`.

**Q2:** لماذا يُرفض الموضع عندما يكون `x_step==0 and y_step==0`؟
A: لأن هذا يعني عدم الحركة — تُضاف نقطة مكررة بنفس الإحداثيات مما يُضيّع عددًا من النقاط المطلوبة.

**Q3:** ما وظيفة `choice([1, -1])`؟
A: تختار عشوائيًا إما 1 (حركة يمينًا/أعلى) أو -1 (حركة يسارًا/أسفل).

**Q4:** ما الفرق بين `randint(1,6)` و `range(1,6)`؟
A: `randint(1,6)` يُرجع رقمًا عشوائيًا من 1 إلى 6 **شاملًا**. `range(1,6)` يُنتج 1,2,3,4,5 **بدون 6**.

**Q5:** ما وظيفة `next(reader)` في كود CSV؟
A: يقرأ صفًّا واحدًا (الترويسة) ويُحرّك مؤشر القراءة — باقي الصفوف تُقرأ بـ `for row in reader`.

**Q6:** كيف تُحوّل نص تاريخ مثل '07/01/2014' لكائن datetime؟
A: `datetime.strptime('07/01/2014', "%m/%d/%Y")` — يجب تطابق الصيغة مع النص تمامًا.

**Q7:** لماذا نستخدم `int(float(value))` بدل `int(value)` لبعض قيم JSON؟
A: لأن بعض القيم تُخزَّن كأعداد عشرية في نص (مثل '1127437398.85751') — `int()` مباشرة يُلقي `ValueError`.

**Q8:** ما الفرق بين `plt.plot()` و `plt.scatter()`؟
A: `plot` يرسم خطًّا متصلًا بلون واحد. `scatter` يرسم نقاطًا منفصلة ويدعم تلوين كل نقطة باستقلالية (`c=قائمة`).

**Q9:** ما وظيفة `fig.autofmt_xdate()`؟
A: يُميل تسميات محور X تلقائيًا لتجنب التداخل عند رسم تواريخ كثيرة.

**Q10:** ما وظيفة `plt.fill_between(dates, highs, lows)`؟
A: يُظلّل المنطقة بين منحنيَين — يُستخدم لإظهار نطاق درجات الحرارة (بين الحد الأعلى والأدنى).

**Q11:** ما الدالة التي تُحوّل اسم دولة لرمز ISO ثنائي الحرف في pygal؟
A: `get_country_code(country_name)` من `country_codes.py` — تبحث في قاموس `COUNTRIES`.

**Q12:** ما الفرق بين `hist.render_to_file('f.svg')` و `hist.render_in_browser()`؟
A: الأول يحفظ ملف SVG دائمًا. الثاني يفتح المتصفح مباشرة (ملف مؤقت).

**Q13:** ما الأمر لتثبيت مكتبة خرائط pygal؟
A: `pip install pygal_maps_world` — منفصلة عن `pygal` الأساسية.

**Q14:** كيف تُمرر بيانات السكان لخريطة World في pygal؟
A: `wm.add('label', {country_code: population_value})` — قاموس رمز ← قيمة.

**Q15:** ما معنى `alpha=0.1` في `fill_between`؟
A: شفافية 10% (معتم بنسبة 10%) — يجعل التظليل شبه شفاف حتى تظهر الخطوط تحته.

**Q16:** ما الفرق بين `json.load(f)` و `csv.reader(f)`؟
A: `json.load(f)` يقرأ الملف كاملًا دفعة واحدة ويُرجع هيكل Python (قاموس/قائمة). `csv.reader(f)` يُرجع كائنًا يُقرأ صفًّا بصف.

**Q17:** لماذا يُعطي `wm.add('2010', cc_populations)` ألوانًا متدرّجة تلقائيًا؟
A: pygal يُرتّب القيم ويُعيّن ألوانًا حسب الترتيب — الدول ذات السكان الأقل تأخذ لونًا فاتحًا والأكثر لونًا داكنًا.

**Q18:** ما وظيفة `enumerate(header_row)` في CSV؟
A: تُرجع أزواجًا (رقم، قيمة) — تُتيح معرفة رقم كل عمود مع اسمه في نفس الوقت.

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

---

### سؤال 1: ما هو المشي العشوائي (Random Walk)؟

**نموذج الإجابة:**
1. **التعريف:** سلسلة من الخطوات العشوائية في مستوى ثنائي الأبعاد — كل خطوة تُحدّد عشوائيًا الاتجاه والمسافة.
2. **المكونات:** قائمة x_values، قائمة y_values، دالة fill_walk تملأهما، دالة choice لاختيار الاتجاه والمسافة.
3. **مثال:** حركة الجزيئات في الهواء، تقلبات سوق الأسهم، انتشار الأمراض.
4. **متى نستخدم:** في المحاكاة العلمية، الألعاب، النمذجة الإحصائية.

---

### سؤال 2: اشرح الفرق بين `scatter` و `plot` في matplotlib.

**نموذج الإجابة:**
1. **التعريف:** كلاهما لرسم البيانات على مستوى ثنائي الأبعاد.
2. **الفرق:** `plot` يصل النقاط بخط متصل (مناسب للسلاسل الزمنية). `scatter` يرسم نقاطًا منفصلة (مناسب للتوزيعات).
3. **مثال:** درجات الحرارة عبر الزمن = `plot`. نقاط المشي العشوائي = `scatter`.
4. **متى تختار scatter:** عندما تريد تلوين كل نقطة بشكل مستقل (`c=قائمة`).

---

### سؤال 3: لماذا يجب استخدام `with open(filename) as f` لفتح الملفات؟

**نموذج الإجابة:**
1. **التعريف:** Context Manager يفتح الملف ويُغلقه تلقائيًا عند الانتهاء.
2. **السبب:** يضمن غلق الملف حتى في حالة حدوث خطأ — يمنع تسرّب الموارد.
3. **مثال:** `with open('data.csv') as f: reader = csv.reader(f)`.
4. **متى نستخدم:** دائمًا عند التعامل مع الملفات.

---

### سؤال 4: ما وظيفة `datetime.strptime()` وكيف تستخدمها؟

**نموذج الإجابة:**
1. **التعريف:** دالة تُحوّل نص تاريخ لكائن `datetime` قابل للحسابات والرسم.
2. **المكونات:** معاملان — النص (`row[0]`) والصيغة (`"%m/%d/%Y"`).
3. **مثال:** `datetime.strptime('07/01/2014', "%m/%d/%Y")` → كائن datetime.
4. **متى نستخدم:** عند قراءة تواريخ من CSV/JSON ورسمها على محور X.

---

### سؤال 5: اشرح كيف يُولّد `pygal.Bar()` مخططًا عموديًا.

**نموذج الإجابة:**
1. **التعريف:** كلاس في مكتبة pygal يُنشئ مخططًا عموديًا تفاعليًا بصيغة SVG.
2. **الخطوات:** إنشاء `hist = pygal.Bar()` ← ضبط `title` و `x_labels` ← `hist.add('name', data)` ← `render_to_file()`.
3. **مثال:** مخطط تكرار أوجه النرد.
4. **متى نستخدم:** عند الحاجة لمخطط تفاعلي قابل للعرض في المتصفح.

---

### سؤال 6: لماذا تُرجع `get_country_code('Arab World')` القيمة None؟

**نموذج الإجابة:**
1. **التعريف:** الدالة تبحث في قاموس `COUNTRIES` عن تطابق اسمي دقيق.
2. **السبب:** 'Arab World' منطقة إحصائية لا دولة معترف بها — لا يوجد لها رمز ISO ثنائي الحرف.
3. **مثال:** نفس المشكلة مع 'Caribbean small states' و 'East Asia & Pacific'.
4. **الحل:** فلتر باستخدام `if code:` لتجاهل هذه الحالات.

---

### سؤال 7: ما الفرق بين `json.load()` و `csv.reader()`؟

**نموذج الإجابة:**
1. **التعريف:** كلاهما يقرآن ملفات بيانات لكن بتنسيقات مختلفة.
2. **الفرق:** `json.load()` يقرأ الملف كاملًا دفعة واحدة ويُرجع dict/list. `csv.reader()` يُرجع iterator يُقرأ صفًّا بصف.
3. **مثال JSON:** `pop_data = json.load(f)` → قائمة قواميس.
4. **مثال CSV:** `for row in csv.reader(f): row[2]` → قائمة نصوص.

---

### سؤال 8: ما وظيفة `alpha` في matplotlib؟

**نموذج الإجابة:**
1. **التعريف:** معامل الشفافية — قيمة من 0 (شفاف تمامًا) إلى 1 (معتم تمامًا).
2. **الاستخدام:** يُستخدم مع `fill_between` لجعل التظليل شبه شفاف، أو مع `scatter` لرسم نقاط متداخلة.
3. **مثال:** `plt.fill_between(dates, highs, lows, alpha=0.1)` → تظليل فاتح جدًا.
4. **متى نستخدم:** عند تداخل عناصر رسومية ونريد رؤيتها معًا.

---

### سؤال 9: كيف يختلف `Die(6)` عن `Die(10)` في البرنامج؟

**نموذج الإجابة:**
1. **التعريف:** كلاهما كائنات من نفس الكلاس `Die` لكن بعدد أوجه مختلف.
2. **الفرق:** `Die(6).roll()` يُرجع 1-6. `Die(10).roll()` يُرجع 1-10. `max_result` يختلف.
3. **مثال:** D6+D10 → مجموع 2 إلى 16، يحتاج `range(2, 17)` للتحليل.
4. **متى نستخدم:** في ألعاب تحتاج نرد بأحجام مختلفة (D4, D6, D8, D10, D12, D20).

---

### سؤال 10: ما الغرض من `fig.autofmt_xdate()`؟

**نموذج الإجابة:**
1. **التعريف:** دالة في matplotlib تُنسّق تسميات محور X المرتبطة بالتواريخ.
2. **الوظيفة:** تُميل التسميات (rotate) زاوية مناسبة لتجنب التداخل عند كثافتها.
3. **مثال:** مخطط يوم بيوم لسنة كاملة — 365 تسمية تتداخل بدون `autofmt_xdate()`.
4. **متى نستخدم:** دائمًا عند رسم بيانات زمنية كثيفة.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أفهم كيف يعمل كلاس `RandomWalk` وأستطيع رسمه خطوة بخطوة.
- [ ] أعرف لماذا نرفض الخطوة عندما `x_step == 0 and y_step == 0`.
- [ ] أستطيع تعريف `Die` بأي عدد من الأوجه.
- [ ] أعرف الفرق بين `randint` و `choice`.
- [ ] أستطيع كتابة كود يرمي نردًا N مرة ويحسب التكرار.
- [ ] أعرف كيف أستخدم `pygal.Bar()` لرسم مدرج تكراري.
- [ ] أفهم الفرق بين `render_to_file` و `render_in_browser`.
- [ ] أستطيع قراءة ملف CSV باستخدام `csv.reader` و `next(reader)`.
- [ ] أعرف كيف أستخدم `enumerate` لمعرفة أرقام الأعمدة.
- [ ] أستطيع تحويل نص تاريخ لـ `datetime` باستخدام `strptime`.
- [ ] أعرف جدول رموز `datetime` (`%m`, `%d`, `%Y`, `%H`, `%M`, `%S`).
- [ ] أفهم وظيفة `fig.autofmt_xdate()`.
- [ ] أستطيع رسم منطقة مظللة بين منحنيَين باستخدام `fill_between`.
- [ ] أعرف كيف أقرأ ملف JSON باستخدام `json.load()`.
- [ ] أفهم لماذا نستخدم `int(float(value))` بدل `int(value)`.
- [ ] أعرف كيف أُنشئ `get_country_code()` وما هو قاموس `COUNTRIES`.
- [ ] أستطيع رسم خريطة عالمية باستخدام `pygal_maps_world`.
- [ ] أعرف كيف أُصنّف الدول لمجموعات وأرسمها بألوان مختلفة.
- [ ] أعرف لماذا تُرجع بعض الدول `None` عند البحث عن رمزها.
- [ ] أفهم الفرق بين `plt.plot()` و `plt.scatter()`.
- [ ] أعرف وظيفة `dpi` و `figsize` و `alpha` و `cmap`.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات

| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| RandomWalk | OOP (Classes) | يستخدم كلاس وخصائص وأساليب |
| Die + pygal | Loops & Lists | تجميع النتائج وتحليلها |
| CSV Analysis | File I/O | قراءة ملفات بيانات حقيقية |
| JSON + Maps | Data Structures | قواميس وقوائم لتمثيل البيانات |
| datetime | String Processing | تحويل النصوص لكائنات |

---

### 🔑 أهم النقاط الذهبية

| الموضوع | النقاط |
| --- | --- |
| `RandomWalk` | ابدأ من [0], استخدم [-1] لآخر موضع, ارفض الخطوة الصفرية |
| `Die` | `randint(1, num_sides)` شامل, `range(1, num_sides+1)` للتحليل |
| `pygal.Bar` | أنشئ → اضبط → add البيانات → render |
| CSV | `next(reader)` للترويسة, `int(row[N])` للبيانات |
| JSON | `json.load(f)` → قائمة قواميس, `int(float(v))` للأعداد الكبيرة |
| datetime | `strptime` للتحليل, `autofmt_xdate` للتنسيق |
| World Map | `get_country_code` → `{code: value}` → `wm.add()` |

---

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `choice([1,-1])` | اختيار عشوائي من قائمة | `RandomWalk.fill_walk()` |
| `randint(1, n)` | عدد عشوائي 1..n شاملًا | `Die.roll()` |
| `c=values` | لون كل نقطة = قيمة في القائمة | `plt.scatter()` |
| `cmap=plt.cm.Blues` | نظام ألوان أزرق متدرّج | `plt.scatter()` |
| `alpha=0.1` | شفافية 10% | `fill_between()` |
| `dpi=128` | جودة عالية للمخطط | `plt.figure()` |
| `figsize=(10,6)` | 10 إنش × 6 إنش | `plt.figure()` |
| `next(reader)` | قراءة الترويسة | `csv.reader()` |
| `enumerate()` | (رقم, قيمة) في آن | `for i, v in enumerate(list)` |
| `strptime(s, fmt)` | نص → datetime | `datetime` module |
| `autofmt_xdate()` | إمالة تسميات X | `fig.autofmt_xdate()` |
| `fill_between()` | تظليل بين منحنيَين | `matplotlib.pyplot` |
| `json.load(f)` | JSON → Python | `import json` |
| `int(float(s))` | نص عشري → int | قيم JSON السكانية |
| `COUNTRIES` | قاموس رمز→اسم | `pygal.maps.world` |
| `World()` | خريطة عالمية | `pygal_maps_world` |
| `%m/%d/%Y` | صيغة تاريخ أمريكي | `strptime` |
| `%Y-%m-%d` | صيغة ISO | `strptime` |

---

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | دائمًا استدعِ `fill_walk()` بعد إنشاء `RandomWalk()` |
| 2 | `range(1, num_sides+1)` وليس `range(num_sides)` |
| 3 | `int(float(value))` وليس `int(value)` لبيانات JSON |
| 4 | `next(reader)` قبل `for row in reader` في CSV |
| 5 | طابق صيغة `strptime` مع صيغة التاريخ في الملف بالضبط |
| 6 | تحقق `if code:` قبل إضافة بيانات pygal لتجنب المناطق غير الدول |
| 7 | `autofmt_xdate()` دائمًا عند رسم تواريخ كثيفة |
| 8 | ضع كل `plt.title()` و `plt.ylabel()` قبل `plt.show()` |

---

### السيناريو 1: تحليل كامل للمشي العشوائي

> الكود التالي يُنشئ مشيًا عشوائيًا:
```python
from random import choice

class RandomWalk():
    def __init__(self, num_points=5):
        self.num_points = num_points
        self.x_values = [0]
        self.y_values = [0]

    def fill_walk(self):
        while len(self.x_values) < self.num_points:
            x_dir = choice([1, -1])
            x_dist = choice([0, 1, 2])
            x_step = x_dir * x_dist
            y_dir = choice([1, -1])
            y_dist = choice([0, 1, 2])
            y_step = y_dir * y_dist
            if x_step == 0 and y_step == 0:
                continue
            self.x_values.append(self.x_values[-1] + x_step)
            self.y_values.append(self.y_values[-1] + y_step)

rw = RandomWalk(3)
rw.fill_walk()
```

### السؤال 1.1 (hard)
إذا كانت نتائج `choice` بالترتيب: x_dir=1, x_dist=0, y_dir=1, y_dist=0 ثم x_dir=-1, x_dist=2, y_dir=1, y_dist=1. كم نقطة ستكون في `x_values` بعد التكرارَين؟

أ) 1  ب) 2  ج) 3  د) 4

**الإجابة الصحيحة: ب**
**التعليل:** التكرار الأول: x_step=0 و y_step=0 → تخطى. التكرار الثاني: x_step=-2, y_step=1 → تُضاف نقطة. إجمالي = [0, -2] = 2 نقاط.

### السؤال 1.2 (hard)
متى تتوقف الحلقة `while`؟

أ) عندما يكون x_values[-1] == 0
ب) عندما `len(self.x_values) == self.num_points`
ج) عندما يتجاوز x_step القيمة 4
د) عند أول خطوة صفرية

**الإجابة الصحيحة: ب**
**التعليل:** الشرط `while len(self.x_values) < self.num_points` يستمر حتى تصبح `len == num_points`.

### السؤال 1.3 (hard)
ما الخطوة التي تُضاف لـ `x_values` إذا كانت `x_dir=-1` و `x_dist=2` والموضع الحالي هو 3؟

أ) -2  ب) 2  ج) 1  د) -1

**الإجابة الصحيحة: أ — القيمة المُضافة في x_values هي 1 (3 + (-2) = 1)**

**تصحيح التعليل:**
- `x_step = (-1) * 2 = -2`
- `next_x = x_values[-1] + x_step = 3 + (-2) = 1`
- القيمة المُضافة = 1 (الإجابة د)

**الإجابة الصحيحة المعدّلة: د**

---

### السيناريو 2: قراءة وتحليل CSV

> ملف CSV يبدأ هكذا:
```
Date,MaxTemp,MeanTemp,MinTemp
2014-07-01,75,64,53
2014-07-02,82,71,60
```
الكود:
```python
import csv
filename = 'weather.csv'
with open(filename) as f:
    reader = csv.reader(f)
    header_row = next(reader)
    highs = []
    for row in reader:
        highs.append(int(row[2]))
```

### السؤال 2.1 (hard)
ما قيمة `highs` بعد تشغيل الكود على الملف أعلاه؟

أ) `[75, 82]`  ب) `[64, 71]`  ج) `[53, 60]`  د) `['64', '71']`

**الإجابة الصحيحة: ب**
**التعليل:** `row[2]` هو العمود رقم 2 (MeanTemp). الصف الأول = '64', الصف الثاني = '71'. `int()` يُحوّلهما لأعداد.

### السؤال 2.2 (hard)
ماذا يحدث لو حذفنا `header_row = next(reader)`؟

أ) لا شيء — الكود يعمل بشكل طبيعي
ب) `highs` ستحتوي قيمة إضافية '64' كنص
ج) `int('MeanTemp')` يُلقي `ValueError` لأن أول صف هو الترويسة
د) `csv.reader` يتجاهل الترويسة تلقائيًا

**الإجابة الصحيحة: ج**
**التعليل:** بدون `next(reader)`، أول تكرار سيُعطي `row = ['Date','MaxTemp','MeanTemp','MinTemp']` — `int('MeanTemp')` = ValueError.

---

### السيناريو 3: تحليل JSON السكاني

> الكود يُعالج `pop_data`:
```python
cc_populations = {}
for pop_dict in pop_data:
    if pop_dict['Year'] == '2010':
        population = int(float(pop_dict['Value']))
        code = get_country_code(pop_dict['Country Name'])
        if code:
            cc_populations[code] = population
```

### السؤال 3.1 (hard)
لماذا نفحص `if code:` قبل الإضافة للقاموس؟

أ) لأن pygal تُلقي خطأ عند المفاتيح الطويلة
ب) لأن بعض الإدخالات مناطق لا دول — `get_country_code` تُرجع `None` لها
ج) لأن `None` لا يمكن استخدامه كمفتاح قاموس
د) لأن بعض الدول ليس لها عدد سكان

**الإجابة الصحيحة: ب**
**التعليل:** إدخالات مثل 'Arab World' لا تُطابق أي دولة في `COUNTRIES` — `get_country_code` تُرجع `None`. لو أضفنا `cc_populations[None] = population` سيُسبب خطأ في pygal.

### السؤال 3.2 (hard)
لماذا نستخدم `int(float(pop_dict['Value']))` بدل `int(pop_dict['Value'])`؟

أ) `float` أسرع في Python
ب) بعض قيم السكان نصوص تحتوي نقطة عشرية — `int()` مباشرة يُلقي `ValueError`
ج) `int()` لا يعمل مع القيم الكبيرة
د) `float` يُقرّب الأرقام للأسفل تلقائيًا

**الإجابة الصحيحة: ب**
**التعليل:** `'1127437398.85751'` هو نص يحتوي نقطة. `int('1127437398.85751')` = ValueError. `float('1127437398.85751')` = 1127437398.85751 ثم `int(1127437398.85751)` = 1127437398.

---

<!-- VALIDATION
schema: 1.0
parts: integration_map, detail, summary, mcq, debug, exercise, analysis_exercise, trace_exercise, design_question, qa_cards, theory, self_check, cheat_sheet
mcq_count: 22
code_blocks: 24
-->
