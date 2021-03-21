package tddbc;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class FizzBuzzTest {
    private FizzBuzz fizzbuzz;

    @Before
    public void 前準備() {
        fizzbuzz = new FizzBuzz();
    }

    @Test
    public void _1を渡すと文字列1を返す() throws Exception{
        // 準備（Arrange）
        // 実行（Act）& 検証（Assert）
        assertEquals("1", fizzbuzz.convert(1));
    }

    // 1または2どちらかのテストだけ残っていれば良いので、
    // メンテナンスコスト削減のために2の方のテストコードを削除しておく
//    @Test
//    public void _2を渡すと文字列2を返す() throws Exception{
//        assertEquals("2", fizzbuzz.convert(2));
//    }

    // JUnit4を使ってしまってて@Nestedのアノテーションが使用不可能なため、
    // インナークラスのテストはコメントアウトし、ドキュメントとする部分はやむなく省略した
    // 本当はTODOリストのように仕様と具体的な実装を書いたツリー構造にしたかった
//    public class _3の倍数の時は数の代わりにFizzに変換する{
//        @Test
//        public void _3を渡すと文字列Fizzを返す() throws Exception{
//            assertEquals("Fizz", fizzbuzz.convert(3));
//        }
//    }
    @Test
    public void _3を渡すと文字列Fizzを返す() throws Exception {
        assertEquals("Fizz", fizzbuzz.convert(3));
    }

    @Test
    public void _5を渡すと文字列Buzzを返す() throws Exception{
        assertEquals("Buzz", fizzbuzz.convert(5));
    }
    
    @Test
    public void 複雑な処理のテスト() throws Exception{
        // Arrange
        // Act
        // Assert（実際はif文など入れ子の中でassertが行われていたり...）
        assertEquals("Buzz", fizzbuzz.convert(5));
        assertEquals("Buzz", fizzbuzz.convert(5));
        assertEquals("Buzz", fizzbuzz.convert(5));
        assertEquals("Buzz", fizzbuzz.convert(5));
        assertEquals("Buzz", fizzbuzz.convert(5));
        assertEquals("Buzz", fizzbuzz.convert(5));
        assertEquals("Buzz", fizzbuzz.convert(5));
        assertEquals("Buzz", fizzbuzz.convert(5));
        assertEquals("Buzz", fizzbuzz.convert(5));
        assertEquals("Buzz", fizzbuzz.convert(5));
        assertEquals("Buzz", fizzbuzz.convert(5));
        assertEquals("Buzz", fizzbuzz.convert(5));
        assertEquals("Buzz", fizzbuzz.convert(5));
    }
}
