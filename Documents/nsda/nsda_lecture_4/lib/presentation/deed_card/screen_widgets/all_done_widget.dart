import 'package:flutter/material.dart';

class AllDoneBanner extends StatelessWidget {
  const AllDoneBanner();

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Container(
      margin: const EdgeInsets.fromLTRB(12, 6, 12, 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: cs.secondaryContainer.withOpacity(0.4),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: cs.secondary),
      ),
      child: Row(
        children: const [
          Icon(Icons.celebration),
          SizedBox(width: 8),
          Expanded(
            child: Text(
              'MashaAllah! All deeds complete — keep the momentum! 💚',
              style: TextStyle(fontWeight: FontWeight.w600),
            ),
          ),
        ],
      ),
    );
  }
}