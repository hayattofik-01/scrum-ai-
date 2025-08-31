import 'package:flutter/material.dart';
import 'package:nsda_lecture_4/presentation/deed_card/models/deed.dart';
import 'package:nsda_lecture_4/presentation/deed_card/screen_widgets/add_deed_dialog.dart';
import 'package:nsda_lecture_4/presentation/deed_card/screen_widgets/all_done_widget.dart';

void main() => runApp(const DeedsApp());

class DeedsApp extends StatelessWidget {
  const DeedsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Daily Deeds',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorSchemeSeed: Colors.green,
      ),
      home: const DeedListPage(),
    );
  }
}


class DeedListPage extends StatefulWidget {
  const DeedListPage({super.key});

  @override
  State<DeedListPage> createState() => _DeedListPageState();
}

class _DeedListPageState extends State<DeedListPage> {
  // Demo dataset (you can replace with your own).
  final List<Deed> deeds = [
    Deed('Pray Fajr on time'),
    Deed('Read 1 page of Qur\'an'),
    Deed('Help a family member'),
    Deed('10 min of dhikr'),
    
    
  ];

  int get total => deeds.length;
  int get doneCount => deeds.where((d) => d.isDone).length;
  double get progress => total == 0 ? 0 : doneCount / total;
  bool get allDone => total > 0 && doneCount == total;

  void _toggle(int index, bool? v) {
    setState(() {
      deeds[index].isDone = v ?? false;

  
    });
  }

  void _resetAll() {
    setState(() {
      for (final d in deeds) {
        d.isDone = false;
      }
    });
  }
 
  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Daily Deeds'),
        actions: [
          IconButton(
            tooltip: 'Reset all',
            onPressed: _resetAll,
            icon: const Icon(Icons.refresh),
          ),
        ],
      ),
      body: Column(
        children: [
          // --- Progress + Counter ---
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 6),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                LinearProgressIndicator(value: progress),
                const SizedBox(height: 8),
                Text(
                  '$doneCount of $total completed',
                  style: Theme.of(context).textTheme.labelLarge,
                ),
              ],
            ),
          ),

          // --- Motivational banner when everything is done ---
          if (allDone) const AllDoneBanner(),

          // --- Dynamic list of cards built from data ---
        Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
              itemCount: deeds.length,
              itemBuilder: (context, i) {
                final deed = deeds[i];
                return Card(
                  elevation: 0.5,
                  margin: const EdgeInsets.symmetric(vertical: 6),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                    side: BorderSide(color: cs.outlineVariant),
                  ),
                  child: CheckboxListTile(
                    title: Text(deed.title),
                    subtitle: const Text('Tap when done'),
                    value: deed.isDone,
                    onChanged: (v) => _toggle(i, v),
                    secondary: AnimatedSwitcher(
                      duration: const Duration(milliseconds: 200),
                      child: deed.isDone
                          ? const Icon(Icons.check_circle, key: ValueKey('ok'))
                          : const Icon(Icons.circle_outlined, key: ValueKey('no')),
                    ),
                    contentPadding:
                        const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  ),
                );
              },
            ),
          ),
        ],
      
        
      ),

      // Optional: Add a new deed quickly during the session
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () async {
          final title = await showDialog<String>(
            context: context,
            builder: (context) => const AddDeedDialog(),
          );
          if (title != null && title.trim().isNotEmpty) {
            setState(() {
              deeds.add(Deed(title.trim()));
            });
          }
        },
        icon: const Icon(Icons.add),
        label: const Text('Add Deed'),
      ),
    );
  }
}



