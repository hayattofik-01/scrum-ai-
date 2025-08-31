import 'package:flutter/material.dart';

class AddDeedDialog extends StatefulWidget {
  const AddDeedDialog();

  @override
  State<AddDeedDialog> createState() => _AddDeedDialogState();
}

class _AddDeedDialogState extends State<AddDeedDialog> {
  final controller = TextEditingController();

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('New Deed'),
      content: TextField(
        controller: controller,
        autofocus: true,
        decoration: const InputDecoration(
          hintText: 'e.g., Give charity today',
          border: OutlineInputBorder(),
        ),
        onSubmitted: (_) => _submit(),
      ),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
        FilledButton(onPressed: _submit, child: const Text('Add')),
      ],
    );
  }

  void _submit() {
    Navigator.pop(context, controller.text);
  }
}
