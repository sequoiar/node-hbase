
// Called by "testFilter.js"

var assert = require('assert');

module.exports = {
	equal: function(client){
		// Test ValueFilter
		client
		.getScanner('node_table')
		.create({
			startRow: 'test_filter|row_1',
			endRow: 'test_filter|row_4',
			filter: {"op":"EQUAL","type":"ValueFilter","comparator":{"value":"bb","type":"BinaryComparator"}}
		}, function(error,id){
			assert.ifError(error);
			this.get(function(error,cells){
				assert.ifError(error);
				assert.strictEqual(1,cells.length);
				assert.strictEqual('test_filter|row_2', cells[0].key);
				assert.strictEqual('node_column_family:bb', cells[0].column);
				this.delete();
			})
		})
	}
}