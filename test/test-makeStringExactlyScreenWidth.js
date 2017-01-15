describe('makeStringExactlyScreenWidth', function() {
  it('returns all spaces given an empty string', function() {
    expect(makeStringExactlyScreenWidth(5, "")).toEqual("     ")
    expect(makeStringExactlyScreenWidth(3, "")).toEqual("   ")
  })

  it('returns all spaces given undefined', function() {
    expect(makeStringExactlyScreenWidth(5)).toEqual("     ")
  })

  it('truncates extra characters', function() {
    expect(makeStringExactlyScreenWidth(3, 'abcd')).toEqual("abc")
  })

  it('pads too-short strings with whitespace', function() {
    expect(makeStringExactlyScreenWidth(4, 'abc')).toEqual("abc ")
    expect(makeStringExactlyScreenWidth(5, 'abc')).toEqual("abc  ")
  })

  it('does nothing to strings that are exactly the screen width', function() {
    expect(makeStringExactlyScreenWidth(3, 'abc')).toEqual('abc')
  })
});
